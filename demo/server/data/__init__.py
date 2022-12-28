import pandas as pd
from pyspark.sql.functions import col, explode

# spark = SparkSession.builder.appName('Recommendations Demo').getOrCreate()

data_path = "./data/"
movies = pd.read_csv(f"{data_path}movies.csv")
users = pd.read_csv(f"{data_path}users.csv", sep='\t', encoding='latin-1',)
ratings = pd.read_csv(f"{data_path}ratings.csv")

# users = users.join(movies, on="userId")