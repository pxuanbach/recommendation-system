from typing import List
from pyspark.ml.recommendation import ALS, ALSModel
from pyspark.sql.functions import col, explode
from pyspark.sql.types import StructType, StructField, IntegerType, LongType, Row
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator

from data import spark, movies, ratings


class ModelBasedRecommendation:
    def __init__(self, 
        userCol="userId", itemCol="movieId", ratingCol="rating", 
        nonnegative=True, implicitPrefs=False, coldStartStrategy="drop"):
        self.als = ALS(userCol=userCol, itemCol=itemCol, ratingCol=ratingCol, 
            nonnegative=nonnegative, implicitPrefs=implicitPrefs,
            coldStartStrategy=coldStartStrategy)
        (self.train,  self.test) = ratings.filter("rating >= 3").randomSplit([0.8, 0.2], seed = 1234)
        self.cv = None
        self.model = None

    def load_model(self) -> ALSModel:
        self.model = ALSModel.load("./static/trained")
        return self.model

    def build_cross_validator(self):
        # Add hyperparameters and their respective values to param_grid
        param_grid = ParamGridBuilder() \
            .addGrid(self.als.rank, [10, 50, 100]) \
            .addGrid(self.als.regParam, [.01, .05, .1]) \
            .build()
        # Define evaluator as RMSE and print length of evaluator
        evaluator = RegressionEvaluator(
           metricName="rmse", 
           labelCol="rating", 
           predictionCol="prediction") 
        # Build cross validation using CrossValidator
        self.cv = CrossValidator(estimator=self.als, estimatorParamMaps=param_grid, evaluator=evaluator, numFolds=5)

    def fit(self, is_cross_validate=False):
        if is_cross_validate:
            self.build_cross_validator()
            model = self.cv.fit(self.train)
            self.model = model.bestModel
        else:
            self.model = self.als.fit(self.train)

    def save_model(self, path="./static/trained"):
        self.model.save(path=path)

    def get_recommendation_user(
        self, user_id: int, num_items: int
    ) -> List[Row]:
        nrecommendations = self.model.recommendForAllUsers(num_items)

        nrecommendations = nrecommendations\
            .withColumn("rec_exp", explode("recommendations"))\
            .select('userId', col("rec_exp.movieId"), col("rec_exp.rating"))
        result = nrecommendations.join(movies, on='movieId').filter(f'userId = {user_id}')
        return result.collect()
    
    def get_recommendation_movie(
        self, movie_id: int, num_items: int
    ) -> List[Row]:
        nrecommendations = self.model.recommendForAllItems(num_items)

        nrecommendations = nrecommendations\
            .withColumn("rec_exp", explode("recommendations"))\
            .select('userId', col("rec_exp.movieId"), col("rec_exp.rating"))
        result = nrecommendations.join(movies, on='movieId').filter(f'movieId = {movie_id}')
        return result.collect()

    def get_recommendation_subset(
        self, user_id: int, num_items: int
    ) -> List[Row]:
        # Manually create adataframe to get recommendations
        # get schema
        userSchema = StructType([StructField("userId", IntegerType(), True)])
        # create the dataframe
        users = spark.createDataFrame([[user_id,]], userSchema)

        # use the loaded model to get predictions
        recommendations = self.model.recommendForUserSubset(users, num_items)

        recommendations = recommendations\
            .withColumn("rec_exp", explode("recommendations"))\
            .select('userId', col("rec_exp.movieId"), col("rec_exp.rating"))

        # create the movies dataframe to join with recommendations
        movies_df = spark.createDataFrame(movies)

        recommendations = recommendations.join(movies_df, on="movieId").collect()
        
        return recommendations


model_based_recommender = ModelBasedRecommendation()