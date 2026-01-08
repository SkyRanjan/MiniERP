from fastapi import APIRouter, HTTPException
from .database import SessionLocal
from .models import Sale, Inventory

router=APIRouter()

@router.post("/sale")
def sell_product(product_id: int, quantity: int):
    db=SessionLocal()

    inventory = db.query(Inventory).filter(
        Inventory.product_id == product_id
    ).first()

    if not inventory:
        raise HTTPException(status_code=404, details="Product not found")
    
    if quantity <=0:
        raise HTTPException(status_code=400, detial="Invalid quantity")
    
    if inventory.quantity < quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )
    sale = Sale(
        product_id=product_id,
        quantity=quantity
    )

    db.add(sale)

    inventory.quantity -= quantity

    db.commit()

    return {"message": "Sale Completed successfully"}