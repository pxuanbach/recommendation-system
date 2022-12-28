from typing import List
from fastapi import APIRouter

from recommender.model_based import model_based_recommender
from schema.recommend import Recommend


router = APIRouter(prefix="/model-based")


@router.get(
    "/{user_id}",
    response_model=List[Recommend]
)
async def model_based_recommend(
    user_id: int,
    num_items: int = 10,
):
    result = await model_based_recommender.get_recommendation(user_id, num_items)
    recommend_arr = []
    for row in result:
        recommend_arr.append(row.asDict())
    return recommend_arr