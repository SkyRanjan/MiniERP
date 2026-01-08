from fastapi import APIRouter
from .database import SessionLocal
from .models import Product, Inventory

router=APIRouter()

@router.post("/products")
def add_product(name: str, price: float, vendor_id: int):
    db=SessionLocal()
    product=Product(name=name, price=price, vendor_id = vendor_id)
    db.add(product)
    db.commit()

    inventory=Inventory(product_id=product.id, quantity=0)
    db.add(inventory)
    db.commit()

    return {"message": "Product added"}

@router.get("/products")
def get_products():
    db=SessionLocal()
    return db.query(Product).all()
