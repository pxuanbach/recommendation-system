import math
from typing import List
from fastapi import APIRouter

from data import movies
from schema.movie import Movie


router = APIRouter(prefix="/movies")


@router.get(
    "",
)
async def get_movies(
    skip: int = 0,
    limit: int = 10
):
    max_limit = skip + limit
    count = 0
    movie_arr= []  
    total = movies.count()
    for row in movies.limit(max_limit).collect():
        count += 1
        if count > skip:
            movie_arr.append(row.asDict())
    return {
        "total": total,
        "total_page": math.ceil(total/limit),
        "page_size": limit,
        "page": skip/limit + 1,
        "data": movie_arr
    } 


@router.get(
    "/{movie_id}",
    response_model=Movie
)
async def get_movie_by_id(
    movie_id: int,
):
    result = movies.select("*").filter(f"movieId == {movie_id}").first()
    return result.asDict()