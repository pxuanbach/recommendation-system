from typing import List
from fastapi import APIRouter

from recommender.model_based import model_based_recommender
from schema.recommend import Recommend
from utils import fetch_movie_data


router = APIRouter(prefix="/model-based")


# @router.get(
#     "/movies/{movie_id}",
#     response_model=List[Recommend]
# )
# def model_based_recommend(
#     movie_id: int,
#     num_items: int = 10,
# ):
#     result = model_based_recommender.get_recommendation_movie(movie_id, num_items)
#     recommend_arr = []
#     for row in result:
#         rec = row.asDict()
#         movie_data = fetch_movie_data(rec["movieId"])
#         rec.update(**movie_data)
#         recommend_arr.append(rec)
#     return recommend_arr


@router.get(
    "/users/{user_id}",
    response_model=List[Recommend]
)
def model_based_recommend(
    user_id: int,
    num_items: int = 10,
):
    result = model_based_recommender.get_recommendation_user(user_id, num_items)
    recommend_arr = []
    for row in result:
        rec = row.asDict()
        movie_data = fetch_movie_data(rec["movieId"])
        rec.update(**movie_data)
        recommend_arr.append(rec)
    return recommend_arr