from pyspark.ml.recommendation import ALS, ALSModel
from pyspark.sql.functions import col, explode

path = "./static/trained"
saved_model = ALSModel.load(path)

# Generate n Recommendations for all users
nloadrecommendations = saved_model.recommendForAllUsers(10)
nloadrecommendations.limit(10).show()

nloadrecommendations = nloadrecommendations\
    .withColumn("rec_exp", explode("recommendations"))\
    .select('userId', col("rec_exp.movieId"), col("rec_exp.rating"))

nloadrecommendations.limit(10).show()
