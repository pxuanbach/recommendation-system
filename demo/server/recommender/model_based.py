from typing import List
from pyspark.ml.recommendation import ALS, ALSModel
from pyspark.sql.functions import col, explode
from pyspark.sql.types import StructType, StructField, IntegerType, LongType, Row

from data import spark, movies


class ModelBasedRecommendation:
    def __init__(self) -> None:
        pass

    def load_model(self) -> ALSModel:
        self.model = ALSModel.load("./static/trained")
        return self.model

    async def get_recommendation(
        self, user_id: int, num_items: int
    ) -> List[Row]:
        nrecommendations = self.model.recommendForAllUsers(num_items)

        nrecommendations = nrecommendations\
            .withColumn("rec_exp", explode("recommendations"))\
            .select('userId', col("rec_exp.movieId"), col("rec_exp.rating"))
        result = nrecommendations.join(movies, on='movieId').filter(f'userId = {user_id}')
        return result.collect()

    async def get_recommendation_subset(
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