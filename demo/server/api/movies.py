import math
from typing import List, Literal
from fastapi import APIRouter, Query
from pyspark.sql.functions import avg, count, array_contains

from data import movies, ratings
from schema.movie import Movie
from utils import fetch_movie_data, fetch_movie_credits, fetch_movie_keywords


router = APIRouter(prefix="/movies")


@router.get(
    "",
)
async def get_movies(
    skip: int = 0,
    limit: int = 10,
    show_type: Literal["all", "havenot", "have"] = "all",
    user_id: int = 0,
    genres: List[str] = Query([]),
):
    max_limit = skip + limit
    count = 0
    total = 0
    movie_arr= [] 
    data = None 
    # show everything
    if show_type == "all":
        query = movies
        for g in genres:
            query = (
                query.filter(array_contains("genreArray", g))
            )
        total = query.count()
        data = query.limit(max_limit).collect()
    elif show_type == "havenot":
        query = movies.join(ratings, on="movieId")\
            .filter(f"userId != {user_id}")\
            .dropDuplicates(["title"])
        for g in genres:
            query = (
                query.filter(array_contains("genreArray", g))
            )
        total = query.count()
        data = query.limit(max_limit).collect()
        
    # Movies I Haven Seen
    else:
        query = ratings.join(movies, on="movieId").filter(f"userId == {user_id}")\
            .dropDuplicates(["title"])
        for g in genres:
            query = (
                query.filter(array_contains("genreArray", g))
            ) 
        total = query.count()
        data = query.limit(max_limit).collect()
    for row in data:
        count += 1
        if count > skip:
            movie = row.asDict()
            movie_data = fetch_movie_data(movie["movieId"])
            movie.update(**movie_data)
            movie_arr.append(movie)
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

    movie_credit = fetch_movie_credits(movie["movieId"])
    movie.update(**movie_credit)

    movie_keywords = fetch_movie_keywords(movie["movieId"])
    movie.update(**movie_keywords)
    return movie