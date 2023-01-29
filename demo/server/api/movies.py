import math
from typing import List
from fastapi import APIRouter
from pyspark.sql.functions import avg, count

from data import movies, ratings
from schema.movie import Movie
from utils import fetch_movie_data


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
    movie = result.asDict()
    movie_data = fetch_movie_data(movie["movieId"])
    movie.update(**movie_data)
    # calculate rating average
    avg_rating = ratings.groupBy("movieId")\
        .agg(
            avg("rating").alias("vote_average"),
            count("rating").alias("vote_count")
        )\
        .filter(f"movieId == {movie_id}").first().asDict()
    movie.update({
        "vote_average": avg_rating["vote_average"],
        "vote_count": avg_rating["vote_count"]
    })
    return movie