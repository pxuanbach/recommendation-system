import math
from typing import List
from fastapi import APIRouter

from data import users, movies, ratings
from schema.user import User


router = APIRouter(prefix="/users")


@router.get(
    "",
)
async def get_users(
    skip: int = 0,
    limit: int = 10
):
    max_limit = skip + limit
    count = 0
    user_arr= [] 
    total = users.count()
    for row in users.limit(max_limit).collect():
        count += 1
        if count > skip:
            user_arr.append(row.asDict())
    return {
        "total": total,
        "total_page": math.ceil(total/limit),
        "page_size": limit,
        "page": skip/limit + 1,
        "data": user_arr
    } 


@router.get(
    "/{user_id}",
    response_model=User
)
async def get_user_by_id(
    user_id: int,
):
    result = users.select("*").filter(f"userId == {user_id}").first()
    return result.asDict()


@router.get(
    "/{user_id}/movies",
)
async def get_rated_movies_of_user(
    user_id: int,
    skip: int = 0,
    limit: int = 10
):
    max_limit = skip + limit
    count = 0
    movie_arr= [] 
    total = ratings.filter(f"userId == {user_id}").count()
    result = ratings.join(movies, on="movieId")\
        .filter(f"userId == {user_id}")\
        .filter("rating >= 3")\
        .limit(max_limit)\
        .collect()
    for row in result:
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
    "/{user_id}/genres",
)
async def get_rated_genres_of_user(
    user_id: int,
):
    result = ratings.join(movies, on="movieId")\
        .filter(f"userId == {user_id}")\
        .collect()

    genre_dict = {} 
    for row in result:
        # value of column genres
        genres: str = row.asDict().get('genres')

        genreList = genres.split('|')

        # push genre to genre_arr if not in
        for gen in genreList:
            if gen not in genre_dict:
                genre_dict.update({f"{gen}": 1})
            else:
                count = genre_dict.get(gen)
                genre_dict.update({f"{gen}": count + 1})
    
    # convert dict to arr
    genre_arr = []
    for key in genre_dict.keys():
        genre_arr.append({
            "name": key,
            "count": genre_dict[key]
        })

    return {
        "total": len(genre_arr),
        "data": genre_arr
    } 
