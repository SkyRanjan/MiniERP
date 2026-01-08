from fastapi import APIRouter
from .database import SessionLocal
from .models import Inventory

router=APIRouter()

@router.get("/inventory")
def get_inventory():
    db=SessionLocal()
    return db.query(Inventory).all()
