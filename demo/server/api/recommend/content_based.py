from typing import List
from fastapi import APIRouter
from pyspark.sql.functions import asc, desc

from recommender.content_based import content_based_recommender
from schema.recommend import Recommend
from data import users, ratings, movies
from utils import fetch_movie_data


router = APIRouter(prefix="/content-based")


@router.get(
    "",
    response_model=List[Recommend]
)
def content_based_recommend(
    title: str,
    num_items: int = 10,
):
    result = content_based_recommender.get_recommendations_for_title(title, num_items)
    recommend_arr= []
    for index, row in result.iterrows():
        rec = dict(**row)
        movie_data = fetch_movie_data(rec["movieId"])
        rec.update(**movie_data)
        recommend_arr.append(rec)

    return recommend_arr



@router.get(
    "/{user_id}",
    response_model=List[Recommend]
)
def content_based_recommend_by_user_id(
    user_id: int,
    num_items: int = 10,
):
    movies_user = ratings.join(movies, on="movieId")\
        .filter(f"userId == {user_id}")\
        .orderBy(desc("rating"), name="title")\
        .collect()
    
    movie_arr = []
    for row in movies_user:
        movie_arr.append(row.asDict())
    
    list_movie_name = [x["title"] for x in movie_arr]
    result = content_based_recommender.get_recommendations(list_movie_name, num_items)
    recommend_arr= []
    for index, row in result.iterrows():
        rec = dict(**row)
        movie_data = fetch_movie_data(rec["movieId"])
        rec.update(**movie_data)
        recommend_arr.append(rec)

    return recommend_arr
