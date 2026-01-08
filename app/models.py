from sqlalchemy import Column, Integer, String, Float, ForeignKey
from .database import Base

class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    phone = Column(String)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Float)
    vendor_id = Column(Integer, ForeignKey("vendors.id"))

class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=0)

class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    vendor_id = Column(Integer)
    quantity = Column(Integer)
