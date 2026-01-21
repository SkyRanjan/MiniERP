# Mini ERP – Inventory & Vendor Management System

A full-stack **Mini ERP system** designed to automate inventory, vendor, purchase, sales, and financial tracking for small-scale businesses such as grocery stores and local vendors.
The **Mini ERP – Inventory & Vendor Management System** replaces manual inventory handling with a **structured, database-driven backend** and a **user-friendly frontend dashboard**.

The system enables efficient management of:

* Vendors and products
* Inventory levels
* Purchase and sales transactions
* Account balance and profit tracking
* Data backup and restoration

The backend is developed using **FastAPI** and **SQLAlchemy**, while the frontend is built with **React**, ensuring seamless real-time interaction between UI and APIs.

---

## Objectives

* Automate vendor and product management
* Track inventory levels accurately
* Handle purchase and sales transactions
* Calculate profit using dynamic selling prices
* Maintain a running business account balance
* Ensure data safety with backup & restore
* Provide a clean, role-based frontend interface

---
## Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* MySQL / SQLite

### Frontend

* React
* Vite
* Axios
* Tailwind CSS

---

## Setup & Execution Guide

### Prerequisites

* Python 3.9+
* Node.js (v16+)
* npm
* MySQL / SQLite
* Git

---

### 1️ Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

### 2️ (Recommended) Create a Virtual Environment

```bash
python -m venv venv
```

Activate it:

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

---

### 3️ Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

### 4️ Install Frontend Dependencies

```bash
cd mini-erp-frontend
npm install
```

---

##  Running the Application

### 🔹 Start Backend Server

```bash
cd app
uvicorn main:app --reload
```

Verify backend:

```
http://127.0.0.1:8000/docs
```

---

### 🔹 Start Frontend Server

```bash
cd mini-erp-frontend
npm run dev
```

Open:

```
http://localhost:5173
```

---

## System Demonstration

### Backend – Swagger API Documentation
<img width="1448" height="1226" alt="Screenshot 2026-01-21 182426" src="https://github.com/user-attachments/assets/dcb30290-2d97-451e-a8bd-409721750661" />

### Frontend – Mini ERP Dashboard
<img width="2880" height="1800" alt="Screenshot 2026-01-21 182919" src="https://github.com/user-attachments/assets/5adb9027-5996-4e9a-a008-001e87a57d93" />


## Project Presentation (PPT)

A detailed project explanation covering:

* System architecture
* Database design (ER diagram)
* API flow
* Business logic
* Frontend–backend integration

 **PPT Link:**
 [https://www.canva.com/design/DAG_B1H12PE/AFGstiZwH0Nr7ZpgnpRv6Q/edit](https://www.canva.com/design/DAG_B1H12PE/AFGstiZwH0Nr7ZpgnpRv6Q/edit)

---

##  Notes & Best Practices

* Keep backend server running while using frontend
* Use a virtual environment for dependency isolation
* Verify database credentials in `database.py`
* Disable debug mode for production deployment

---

##  Conclusion

This project demonstrates a **complete, real-world Mini ERP backend and frontend integration**, 
implementing correct business logic, RESTful API design, relational database modeling, and 
a modern UI — suitable for **academic evaluation and practical deployment**.

