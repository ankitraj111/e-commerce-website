# E-Commerce API - Spring Boot Backend

A professional, production-ready RESTful API for an e-commerce platform built with Spring Boot 3, PostgreSQL, JWT authentication, and Stripe payment integration.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Product Management**: Browse products with category filtering and pagination
- **Shopping Cart**: Add, update, and manage items in cart
- **Order Processing**: Create orders with order tracking
- **Admin Dashboard**: Admin endpoints for product and order management
- **Payment Integration**: Stripe integration for secure payments
- **Database**: PostgreSQL with optimized schema and indexing
- **Security**: CORS configuration, input validation, SQL injection prevention

## Tech Stack

- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Stripe API
- Lombok
- Maven

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Stripe Account (for payments)

## Setup Instructions

### 1. Database Setup

```bash
# Create database
createdb ecommerce_db

# Create database user
createuser -P ecommerce_user  # password: ecommerce_password

# Grant privileges
psql -U postgres -d ecommerce_db -c "GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;"
```

### 2. Environment Configuration

Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce_db
    username: ecommerce_user
    password: ecommerce_password

jwt:
  secret: your-super-secret-jwt-key-change-this-in-production

stripe:
  api-key: sk_test_your_stripe_key_here
  webhook-secret: whsec_your_webhook_secret_here
```

### 3. Build and Run

```bash
# Build the project
mvn clean package

# Run the application
mvn spring-boot:run

# Or run the JAR directly
java -jar target/ecommerce-api-1.0.0.jar
```

The API will be available at `http://localhost:8080/api`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Products
- `GET /products` - Get all products (paginated)
- `GET /products/{id}` - Get product details
- `GET /products/category/{categoryId}` - Get products by category

### Cart
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/{productId}` - Remove item from cart
- `DELETE /cart` - Clear entire cart

### Admin
- `POST /admin/products` - Create product
- `PUT /admin/products/{id}` - Update product
- `DELETE /admin/products/{id}` - Delete product
- `GET /admin/orders` - Get all orders
- `PUT /admin/orders/{id}/status` - Update order status

## Database Schema

The application includes comprehensive database schema with the following tables:
- users
- categories
- products
- reviews
- cart_items
- addresses
- orders
- order_items

All with proper relationships, constraints, and indexes for optimal performance.

## Security Features

- JWT Token-based authentication
- BCrypt password hashing
- CORS configuration
- Input validation
- SQL injection prevention via JPA
- Role-based access control (USER, ADMIN)

## API Documentation

For detailed API documentation and request/response examples, see the postman collection or API documentation file.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - All rights reserved
