from fastapi import APIRouter, HTTPException
from .database import SessionLocal
from .models import Vendor, Product, Inventory, Purchase
import re

router = APIRouter()

@router.post("/vendors")
def add_vendor(name: str, phone: str):
    if not name.replace(" ", "").isalpha():
        raise HTTPException(
            status_code=400,
            detail="Vendor name must contain only alphabets."
        )
    if not phone.isdigit() or len(phone) != 10 or phone.startswith("0"):
        raise HTTPException(
            status_code=400,
            detail="Phone number must be 10 digits and not starting with 0"
        )
    db = SessionLocal()
    vendor = Vendor(name=name, phone=phone)
    db.add(vendor)
    db.commit()
    db.close()
    return {"message": "Vendor added"}

@router.get("/vendors")
def get_vendors():
    db = SessionLocal()
    data = db.query(Vendor).all()
    db.close()
    return data

@router.delete("/vendors/{vendor_id}")
def delete_vendor(vendor_id: int):
    db=SessionLocal()

    vendor=db.query(Vendor).filter(Vendor.id==vendor_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    products=db.query(Product).filter(Product.vendor_id == vendor_id).all()

    for product in products:
        db.query(Inventory).filter(
            Inventory.product_id == product.id
        ).delete()
        db.query(Purchase).filter(
            Purchase.product_id==product.id
        ).delete()
        db.delete(product)
    
    db.delete(vendor)
    db.commit()
    db.close()
    return {"message": "Vendor and associated data deletion successful."}