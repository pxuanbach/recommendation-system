import math
from typing import List
from fastapi import APIRouter

from data import users, movies, ratings
from schema.user import User
from utils import fetch_genres


router = APIRouter(prefix="/genres")


@router.get(
    "",
)
async def get_users():
    genres = fetch_genres()
    return genres