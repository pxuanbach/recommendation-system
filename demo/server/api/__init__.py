from fastapi import APIRouter

from api import users, movies, recommend


router = APIRouter(prefix="/api")


router.include_router(users.router, tags=["users"])
router.include_router(movies.router, tags=["movies"])
router.include_router(recommend.router, tags=["recommend"])