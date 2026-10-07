# 📦 InventoryMaster - Production-Grade MERN CRUD Application

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://reactjs.org/)
[![React 18](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express_4.18-000000.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248.svg)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A full-stack enterprise inventory management web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Features real-time stock valuation metrics, live search filtering, unique barcode validation, and seamless CRUD operations.

---

## ✨ Key Features

- 📊 **Executive Analytics Dashboard**: Live KPI metric cards calculating total inventory items, aggregate stock valuation, and average item cost.
- 🔍 **Real-Time Client-Side Search**: Instant filter by product name or numeric barcode as you type.
- 🔄 **Full RESTful CRUD Workflows**:
  - **Create**: Add stock items with duplicate barcode prevention.
  - **Read**: Fetch product lists and individual item specifications.
  - **Update**: In-place inline product parameter modifications.
  - **Delete**: Remove items from inventory with user confirmation prompts.
- ⚡ **Single Page Application (SPA)**: Smooth client-side routing powered by React Router v6.
- 🎨 **Modern Design System**: Built with custom Bootstrap 5 styling, FontAwesome icons, glassmorphism stat cards, and fully responsive layouts.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React 18, React Router v6, Axios/Fetch API, Bootstrap 5 | User Interface, Reactive Filtering & State Management |
| **Backend** | Node.js, Express.js | REST API Router, CORS Middleware, Error Handling |
| **Database** | MongoDB, Mongoose ODM | Document Storage, Schema Validation, Barcode Indexing |
| **Tools** | Nodemon, Git | Development Server Auto-restart & Version Control |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or MongoDB Atlas running on `127.0.0.1:27017`

---

### 1. Clone the Repository
```bash
git clone https://github.com/SIDDU-2006/Inventory-Management-System.git
cd Inventory-Management-System
```

### 2. Setup & Start Backend Server
```bash
# Navigate to Backend folder
cd Backend

# Install dependencies
npm install

# Start development server
npm run server
```
*Backend will run on **`http://localhost:3001`** and connect automatically to MongoDB `IMS` database.*

---

### 3. Setup & Start Frontend Application
Open a **new terminal window** and run:
```bash
# Navigate to Frontend folder
cd Frontend/inventory_management_system

# Install dependencies
npm install

# Start React app
npm start
```
*Frontend will open automatically at **`http://localhost:3000`**.*

---

## 📡 REST API Documentation

| HTTP Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Fetch all products | None |
| `GET` | `/products/:id` | Fetch product by ID | None |
| `POST` | `/insertproduct` | Add new product | `{"ProductName": "Wireless Mouse", "ProductPrice": 29.99, "ProductBarcode": 123456789012}` |
| `PUT` | `/updateproduct/:id` | Update product by ID | `{"ProductName": "Wireless Mouse", "ProductPrice": 34.99, "ProductBarcode": 123456789012}` |
| `DELETE` | `/deleteproduct/:id` | Delete product by ID | None |

---

## 📁 Repository Directory Structure

```
Inventory-Management-System/
├── Backend/
│   ├── Models/
│   │   └── Products.js       # Mongoose Schema & Data Model
│   ├── Routes/
│   │   └── router.js         # RESTful API Route Handlers
│   ├── db.js                 # MongoDB Connection Setup
│   ├── index.js              # Express App Server Entry Point
│   └── package.json          # Node Dependencies & Scripts
└── Frontend/
    └── inventory_management_system/
        ├── public/
        │   └── index.html    # Base HTML Document
        ├── src/
        │   ├── components/
        │   │   ├── Home.js           # Analytics Dashboard Page
        │   │   ├── Products.js       # Inventory Table & Search Filter Page
        │   │   ├── InsertProduct.js  # Add Product Form Page
        │   │   ├── UpdateProduct.js  # Edit Product Form Page
        │   │   ├── Navbar.js         # Navigation Header Component
        │   │   └── About.js          # Architecture Breakdown Page
        │   ├── App.js                # React Router Config
        │   └── App.css               # Modern Design System CSS
        └── package.json              # Frontend Dependencies
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/SIDDU-2006/Inventory-Management-System/issues).

---

## 📝 License

Distributed under the **ISC License**.
