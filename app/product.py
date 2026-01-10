from fastapi import APIRouter, HTTPException
from .database import SessionLocal
from .models import Product, Inventory, Purchase

router=APIRouter()

@router.post("/products")
def add_product(name: str, price: float, vendor_id: int):
    if price <= 0:
        raise HTTPException(
            status_code=400,
            detial="Product price must be greater than 0"
        )
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

@router.delete("/products/product_id")
def delete_product(product_id: int):
    db = SessionLocal()

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detial="Product not found")
    
    db.query(Inventory).filter(
        Inventory.product_id == product_id
    ).delete()

    db.query(Purchase).filter(
        Purchase.product_id==product_id
    ).delete()

    db.delete(product)
    db.commit()

    return {"message":"Product deleted successfully."}