from fastapi import APIRouter, HTTPException
from .database import SessionLocal
from .models import Purchase, Inventory

router = APIRouter()

@router.post("/purchase")
def purchase_product(product_id: int, vendor_id: int, quantity: int):
    if quantity<=0:
        raise HTTPException(
            status_code=400,
            detial="Purchase quantity must be greater than 0"
        )
    db=SessionLocal()
    inventory=db.query(Inventory).filter(
        Inventory.product_id == product_id
    ).first()

    if not inventory:
        raise HTTPException(status_code=404, detail="Product not found")
    purchase = Purchase(
        product_id= product_id,
        vendor_id = vendor_id,
        quantity=quantity
    )
    db.add(purchase)

    inventory=db.query(Inventory).filter(
        Inventory.product_id==product_id
    ).first()

    inventory.quantity += quantity
    db.commit()

    return {"message": "Purchase recorded and reflected in inventory"}