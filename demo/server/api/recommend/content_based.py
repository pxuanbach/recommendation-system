from typing import List
from fastapi import APIRouter
from pyspark.sql.functions import asc, desc

from recommender.content_based import content_based_recommender
from schema.recommend import Recommend
from data import users, ratings, movies


router = APIRouter(prefix="/content-based")


@router.get(
    "/{user_id}",
    # response_model=List[Recommend]
)
async def content_based_recommend(
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
    list_recommend = []
    for movie_name in list_movie_name:
        result, _v = content_based_recommender.genre_recommendations(movie_name, 10)
        print(result, _v)

    # return list_recommend