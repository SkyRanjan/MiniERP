from fastapi import APIRouter
from .database import SessionLocal
from .models import Vendor

router = APIRouter()

@router.post("/vendors")
def add_vendor(name: str, phone: str):
    db = SessionLocal()
    vendor = Vendor(name=name, phone=phone)
    db.add(vendor)
    db.commit()
    return {"message": "Vendor added"}

@router.get("/vendors")
def get_vendors():
    db = SessionLocal()
    return db.query(Vendor).all()
