import pandas as pd
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode


spark = SparkSession.builder.appName('Recommendations Demo').getOrCreate()


data_path = "./data/"
users = spark.read.csv(f"{data_path}users.csv", sep='\t', header=True)\
    .withColumn('userId', col('userId').cast('integer'))\
    .withColumn('gender', col('gender').cast('string'))\
    .withColumn('age', col('age').cast('integer'))\
    .withColumn('occupation', col('occupation').cast('integer'))\
    .withColumn('zipcode', col('zipcode').cast('integer'))\
    .withColumn('age_desc', col('age_desc').cast('string'))\
    .withColumn('occ_desc', col('occ_desc').cast('string'))\
    .drop("_c0")

movies = spark.read.csv(f"{data_path}movies.csv", header=True)\
    .withColumn('movieId', col('movieId').cast('integer'))\
    .withColumn('title', col('title').cast('string'))\
    .withColumn('genres', col('genres').cast('string'))

ratings = spark.read.csv(f"{data_path}ratings.csv", header=True)\
    .withColumn('userId', col('userId').cast('integer'))\
    .withColumn('movieId', col('movieId').cast('integer'))\
    .withColumn('rating', col('rating').cast('float'))\
    .drop('timestamp')
links = spark.read.csv(f"{data_path}links.csv", header=True)\
    .withColumn('movieId', col('movieId').cast('integer'))\
    .withColumn('imdbId', col('imdbId').cast('string'))\
    .withColumn('tmdbId', col('tmdbId').cast('integer'))