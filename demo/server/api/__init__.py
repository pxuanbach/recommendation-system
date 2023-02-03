from fastapi import APIRouter

from api import users, movies, recommend, genres


router = APIRouter(prefix="/api")


router.include_router(users.router, tags=["users"])
router.include_router(movies.router, tags=["movies"])
router.include_router(genres.router, tags=["genres"])
router.include_router(recommend.router, tags=["recommend"])