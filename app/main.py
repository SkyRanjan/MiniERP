from fastapi import FastAPI
from .database import engine
from . import models
from .vendor import router as vendor_router

app = FastAPI(title="Inventory Management System")

models.Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Inventory System Running"}

app.include_router(vendor_router)

import os
import json
from .database import SessionLocal
from .models import Vendor, Product, Inventory, Purchase

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUP_FILE = os.path.join(BASE_DIR, "backup", "backup.json")


@app.post("/backup")
def backup_data():
    db = SessionLocal()

    data = {
        "vendors": [
            {"id": v.id, "name": v.name, "phone": v.phone}
            for v in db.query(Vendor).all()
        ],
        "products": [
            {
                "id": p.id,
                "name": p.name,
                "price": p.price,
                "vendor_id": p.vendor_id
            }
            for p in db.query(Product).all()
        ],
        "inventory": [
            {"product_id": i.product_id, "quantity": i.quantity}
            for i in db.query(Inventory).all()
        ],
        "purchases": [
            {
                "product_id": pr.product_id,
                "vendor_id": pr.vendor_id,
                "quantity": pr.quantity
            }
            for pr in db.query(Purchase).all()
        ]
    }

    os.makedirs(os.path.dirname(BACKUP_FILE), exist_ok=True)

    with open(BACKUP_FILE, "w") as f:
        json.dump(data, f, indent=4)

    return {"message": "Backup created successfully"}


@app.post("/restore")
def restore_data():
    if not os.path.exists(BACKUP_FILE):
        return {"error": "Backup file not found. Run /backup first."}

    db = SessionLocal()

    with open(BACKUP_FILE, "r") as f:
        data = json.load(f)

    db.query(Vendor).delete()
    db.query(Product).delete()
    db.query(Inventory).delete()
    db.query(Purchase).delete()
    db.commit()

    for v in data["vendors"]:
        db.add(Vendor(**v))

    for p in data["products"]:
        db.add(Product(**p))

    for i in data["inventory"]:
        db.add(Inventory(**i))

    for pr in data["purchases"]:
        db.add(Purchase(**pr))

    db.commit()

    return {"message": "Data restored successfully"}
