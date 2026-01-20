from fastapi import APIRouter
from .database import SessionLocal
from .models import Inventory

router=APIRouter()

@router.get("/reportl/low-stock")
def low_stock():
    db=SessionLocal()
    data = db.query(Inventory).filter(Inventory.quantity<10).all()
    db.close()
    return data