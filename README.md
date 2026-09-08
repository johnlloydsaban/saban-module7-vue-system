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


# Module 9 – Software Evolution

## Change Request

**Change Request ID:** CR-M9-01

**Title:** Add Product Status and Category Filtering with Enhanced Dashboard Statistics

**Maintenance Type:** Perfective Maintenance

## Maintenance Type

**Perfective Maintenance**

The change improves the existing Inventory Management System by adding product status and category filtering and enhancing the dashboard statistics. These improvements make it easier for users to find products, monitor inventory status, and understand inventory information without removing the existing system functions.

## Acceptance Criteria

1. The Product Inventory section provides All Status, In Stock, Low Stock, and Out of Stock filter options.
2. Selecting In Stock displays only products marked as In Stock.
3. Selecting Low Stock displays only products marked as Low Stock.
4. Selecting Out of Stock displays only products marked as Out of Stock.
5. The system provides a category filter based on the available product categories.
6. The search function can find products using Product ID, Product Name, or Category.
7. Search and status/category filters can work together to display matching products.
8. The Dashboard displays updated inventory statistics, including product and stock information.
9. Existing Add Product, Edit Product, Delete Product, Validation, Login, Register, Logout, and Local Storage functions continue to work correctly.
10. The existing automated tests and production build continue to pass after the changes.

Updated Test Cases
Test Case ID	Test Case	Expected Result	Actual Result	Status
TC01	Add Product	New product is added successfully.	Product is added successfully.	PASS
TC02	Add Product with Empty Fields	Required-field validation message is displayed.	Validation message is displayed.	PASS
TC03	Edit Product	Existing product information is updated successfully.	Product information is updated successfully.	PASS
TC04	Delete Product	Product is removed after delete confirmation/action.	Product is removed successfully.	PASS
TC05	Search by Product Name	Matching products are displayed.	Matching products are displayed.	PASS
TC06	Search by Product ID	Product matching the entered ID is displayed.	Matching product is displayed.	PASS
TC07	Search by Category	Products matching the category are displayed.	Matching category products are displayed.	PASS
TC08	In Stock Filter	Only products with In Stock status are displayed.	Only In Stock products are displayed.	PASS
TC09	Low Stock Filter	Only products with Low Stock status are displayed.	Only Low Stock products are displayed.	PASS
TC10	Out of Stock Filter	Only products with Out of Stock status are displayed.	Only Out of Stock products are displayed.	PASS
TC11	Combined Search and Filter	Search results match both the keyword and selected filter.	Matching filtered results are displayed.	PASS
TC12	Existing Feature Regression	Login, Register, Logout, Add, Edit, Delete, Validation, and Local Storage continue working correctly.	Existing features continue working correctly.	PASS
Automated Test Evidence


Vitest: 5 tests passed, 0 failed
Production Build: Successful
Regression Testing: Passed
GitHub Actions: Successful

## Impact Analysis

### Affected Components

| Component | Impact | Description |
|---|---|---|
| ProductList.vue | High | Updated to support product ID, name, category, and status filtering. |
| App.vue | Medium | Continues supplying product records to the inventory components. |
| Dashboard | Medium | Uses inventory data for product and stock statistics. |
| ProductForm.vue | Low | Existing product creation and validation must continue working. |
| Local Storage | Low | Existing product persistence must remain unchanged. |
| Authentication | Low | Login, Register, and Logout must continue working after the update. |

### Existing Features at Risk

- Add Product
- Edit Product
- Delete Product
- Product Search
- Form Validation
- Login
- Register
- Logout
- Local Storage Persistence

### New Features

- Product Status Filter
- Category Filter
- Product ID Search
- Combined Search and Filtering

### Regression Strategy

After implementing the changes, the existing inventory and authentication functions will be tested again to confirm that the new filtering functionality does not break previously working features.