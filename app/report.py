from fastapi import APIRouter
from .database import SessionLocal
from .models import Inventory

router=APIRouter()

@router.get("/report/low-stock")
def low_stock():
    db=SessionLocal()
    return db.query(Inventory).filter(Inventory.quantity<10).all()