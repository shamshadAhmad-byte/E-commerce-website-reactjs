E-Commerce Microservices Application:

A full-stack e-commerce application built using microservices architecture, with separate backend services and a modern frontend.

Project Overview:

This project demonstrates how a real-world e-commerce system can be designed using independent microservices, where each service has its own responsibility and database.

Key Goals:

  Scalability
  Loose coupling
  Independent deployment
  Real-world backend architecture

Architecture:

    Frontend (React)
      |
    API Gateway
      |
    ------------------------------------------------
    | User Service | Product Service | Order Service |
    ------------------------------------------------
    (using same databse)

Microservices Description:

🔹 User Service:

Responsible for user authentication and profile management.

Features:

User registration & login
JWT authentication
Role-based access (Admin / User)
User profile & address management

Tech: Node.js Express MongoDB JWT


🔹 Product Service:

Handles product catalog and inventory.

Features:

Product CRUD
Category management
Stock management
Product search & filter

Tech: Node.js, Express, MongoDB

🔹 Order Service:

Manages order lifecycle and payments.

Features:

Create orders
Fetch user orders
Order status tracking
Communication with Product Service

Tech: Node.js, Express, MongoDB, REST-based inter-service communication


🖥️ Frontend

Features

User authentication

Product listing & search

Cart management

Order placement & tracking

Tech: React, Tailwind CSS, Axios

ecommerce-microservices/
│
├── frontend/
│
backend-microservices
    ├── api-gateway/
    │
    ├── user-service/
    │
    ├── product-service/
    │
    ├── order-service/



