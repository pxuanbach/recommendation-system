from fastapi import APIRouter

from api.recommend import model_based, content_based


router = APIRouter(prefix="/recommend")


router.include_router(model_based.router)
router.include_router(content_based.router)