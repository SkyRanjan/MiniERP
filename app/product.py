from fastapi import APIRouter, HTTPException
from .database import SessionLocal
from .models import Product, Inventory, Purchase, Vendor

router = APIRouter()
# class ProductCreate(BaseModel):
#     name: str
#     price: float
#     vendor_id: int
@router.post("/products")
def add_product(product: ProductCreate):
    name=product.name
    price = product.price
    vendor_id = product.vendor_id
    if price <= 0:
        raise HTTPException(
            status_code=400,
            detail="Product price must be greater than 0"
        )

    db = SessionLocal()

    # 🔹 Check vendor exists
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found"
        )

    product = Product(name=name, price=price, vendor_id=vendor_id)
    db.add(product)
    db.commit()
    db.refresh(product)  # 🔹 ensures product.id is available

    inventory = Inventory(product_id=product.id, quantity=0)
    db.add(inventory)
    db.commit()
    db.close()
    return {"message": "Product added successfully"}
# def add_product(product: ProductCreate):
#     db = SessionLocal()

#     if product.price <= 0:
#         raise HTTPException(status_code=400, detail="Product price must be greater than 0")

#     vendor = db.query(Vendor).filter(Vendor.id == product.vendor_id).first()
#     if not vendor:
#         raise HTTPException(status_code=404, detail="Vendor not found")

#     new_product = Product(
#         name=product.name,
#         price=product.price,
#         vendor_id=product.vendor_id
#     )

#     db.add(new_product)
#     db.commit()
#     db.refresh(new_product)

#     inventory = Inventory(product_id=new_product.id, quantity=0)
#     db.add(inventory)
#     db.commit()

#     return {"message": "Product added successfully"}



@router.get("/products")
def get_products():
    db = SessionLocal()
    data = db.query(Product).all()
    db.close()
    return data


@router.delete("/products/{product_id}")
def delete_product(product_id: int):
    db = SessionLocal()

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.query(Inventory).filter(
        Inventory.product_id == product_id
    ).delete()

    db.query(Purchase).filter(
        Purchase.product_id == product_id
    ).delete()

    db.query(Sale).filter(
        Sale.product_id == product_id
    ).delete()

    db.delete(product)
    db.commit()
    db.close()
    return {"message": "Product deleted successfully"}
