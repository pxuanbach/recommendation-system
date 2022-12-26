import pandas as pd
from pyspark.sql.functions import col, explode
from pyspark import SparkContext
from pyspark.sql import SparkSession

# spark = SparkSession.builder.appName('Recommendations Demo').getOrCreate()

data_path = "./data/"
movies = pd.read_csv(f"{data_path}movies.csv")
