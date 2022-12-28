from fastapi import APIRouter

from api.recommend import model_based


router = APIRouter(prefix="/recommend")


router.include_router(model_based.router)