from typing import List
from fastapi import APIRouter
from pyspark.sql.functions import asc, desc

from recommender.content_based import content_based_recommender
from schema.recommend import Recommend
from data import users, ratings, movies


router = APIRouter(prefix="/content-based")


@router.get(
    "/{user_id}",
    response_model=List[Recommend]
)
def content_based_recommend(
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
    recommend_arr= [
        (
            Recommend(**row)
        ) for index, row in result.iterrows()
    ]  
    return recommend_arr
