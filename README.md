# Inventory Management System

A web-based Inventory Management System developed using Vue.js for Software Engineering 1 – Module 7.

## Student Information

- **Name:** John Lloyd Saban
- **Course & Section:** BSCS 3A
- **Subject:** Software Engineering 1
- **Module:** Module 7 – Vue System
- **Instructor:** Patrick Jason L. Torres

---

## Project Overview

The Inventory Management System is a web-based application developed using Vue.js. It provides a centralized interface for managing product records and monitoring inventory stock levels.

The system allows users to add, view, search, update, and delete products. It also provides inventory reports, product categories, stock status monitoring, and system settings.

---

## Objectives

The main objectives of the system are to:

- Provide a centralized platform for managing inventory records.
- Allow users to add and maintain product information.
- Monitor product quantities and stock status.
- Provide an organized product inventory list.
- Generate inventory summaries and reports.
- Provide a responsive and user-friendly interface.

---

## Main Features

### Dashboard

The dashboard provides an overview of the inventory, including:

- Total Products
- In Stock
- Low Stock
- Out of Stock
- Recent Products
- Quick Actions
- Inventory Summary

### Product Management

Users can:

- Add new products
- View product records
- Search for products
- Edit product information
- Delete product records

### Stock Monitoring

Products can be classified as:

- In Stock
- Low Stock
- Out of Stock

### Reports

The Reports section provides inventory statistics such as:

- Total number of products
- Total quantity
- Low-stock products
- Out-of-stock products

### Categories

Products are grouped according to their assigned categories.

### Settings

The Settings section displays information about the system's local storage and current product records. It also provides an option to clear the stored inventory.

### Responsive Design

The system is designed to work on different screen sizes. On smaller screens, the navigation menu changes to a hamburger menu and product records are displayed using mobile-friendly cards.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Vue.js | Frontend application |
| Vite | Development and build tool |
| JavaScript | Application functionality |
| Tailwind CSS | User interface styling |
| Git | Version control |
| GitHub | Repository hosting |
| LocalStorage | Local product data persistence |

---

## Project Structure

```text
saban-module7-vue-system/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── ProductForm.vue
│   │   └── ProductList.vue
│   │
│   ├── App.vue
│   ├── main.js
│   └── style.css
│
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js