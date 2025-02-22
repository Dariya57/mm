# Clothing Store Backend

## Overview
This project is a backend application for a clothing store, built using **Node.js, Express, and MongoDB**. It provides functionalities for user authentication, product management, and order handling.

## Features
- **User Authentication:** Register and login with JWT-based authentication.
- **Admin Management:** Add, update, and delete products (Admin only).
- **Product Management:** CRUD operations on products.
- **Order Handling:** Users can place and view orders.
- **Secure API:** Uses **bcrypt.js** for password hashing and **JWT** for authentication.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt.js
- **HTTP Client:** Fetch API (Frontend)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Dariya57/mm.git
   cd mm
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (**.env** file):
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   node server.js
   ```

## API Endpoints
### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login

### Product Routes
- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product (**Admin only**)
- `PUT /api/products/:id` - Update product (**Admin only**)
- `DELETE /api/products/:id` - Delete product (**Admin only**)

### Order Routes
- `POST /api/orders` - Place an order
- `GET /api/orders` - Get all orders

## How to Add a Product as Admin
1. **Login as Admin** to get the JWT token.
2. **Include the token** in the request header:
   ```json
   {
     "Authorization": "Bearer YOUR_JWT_TOKEN"
   }
   ```
3. **Make a POST request** to `/api/products` with product details:
   ```json
   {
     "name": "T-Shirt",
     "price": 20.99
   }
   ```
## Future Improvements
- Implement a **frontend UI**
- Add **payment integration**
- Improve **order tracking system**
