from pyspark.ml.recommendation import ALS, ALSModel
from pyspark.sql.functions import col, explode
from pyspark import SparkContext
from pyspark.sql import SparkSession, DataFrame

from data import movies


spark = SparkSession.builder.appName('Recommendations Demo').getOrCreate()


def load_model() -> ALSModel:
    model = ALSModel.load("./static/trained")
    return model


async def get_model_based_recommend(user_id: int, model: ALSModel) -> DataFrame:
    nrecommendations = model.recommendForAllUsers(10)
    movies_df = spark.createDataFrame(movies)
    nrecommendations = nrecommendations\
        .withColumn("rec_exp", explode("recommendations"))\
        .select('userId', col("rec_exp.movieId"), col("rec_exp.rating"))
    result = nrecommendations.join(movies_df, on='movieId').filter(f'userId = {user_id}')
    return result