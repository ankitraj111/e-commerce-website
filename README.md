# 🛍️ ShopHub - Professional E-Commerce Platform

<div align="center">

![ShopHub Logo](https://img.shields.io/badge/ShopHub-E--Commerce-purple?style=for-the-badge&logo=shopping-cart)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**A modern, full-stack e-commerce platform with stunning UI/UX and enterprise-grade features**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 🎨 Modern UI/UX
- **Stunning Design**: Gradient-based modern interface with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Full dark mode support with smooth transitions
- **Micro-interactions**: Delightful hover effects and animations
- **Accessibility**: WCAG compliant with keyboard navigation

### 🛒 E-Commerce Features
- **Product Catalog**: Browse thousands of products with advanced filtering
- **Smart Search**: Real-time search with autocomplete
- **Shopping Cart**: Persistent cart with quantity management
- **Wishlist**: Save products for later
- **Secure Checkout**: Stripe integration for payments
- **Order Tracking**: Real-time order status updates
- **User Reviews**: Rate and review products

### 👤 User Management
- **Authentication**: JWT-based secure authentication
- **User Profiles**: Manage personal information
- **Order History**: View past orders and invoices
- **Address Book**: Save multiple shipping addresses
- **Wishlist**: Save favorite products

### 🎯 Admin Dashboard
- **Sales Analytics**: Real-time sales charts and metrics
- **Product Management**: CRUD operations for products
- **Order Management**: Process and track orders
- **User Management**: View and manage customers
- **Inventory Control**: Stock management

### 🚀 Performance & Security
- **Fast Loading**: Optimized images and lazy loading
- **SEO Optimized**: Meta tags and structured data
- **Secure**: HTTPS, CORS, JWT, password hashing
- **Scalable**: Microservices-ready architecture
- **API Documentation**: Comprehensive REST API docs

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4.2
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Hooks
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion + Custom CSS

### Backend
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL 12+
- **ORM**: Spring Data JPA
- **Validation**: Hibernate Validator
- **Payment**: Stripe SDK
- **Build Tool**: Maven

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm/pnpm
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + Spring Boot Test
- **Deployment**: Vercel (Frontend) + Docker (Backend)

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required
- Node.js 18+ 
- Java 17+
- PostgreSQL 12+
- Maven 3.6+

# Optional
- Docker
- pnpm (recommended)
```

### Installation

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/shophub.git
cd shophub
```

#### 2️⃣ Frontend Setup
```bash
# Install dependencies
npm install
# or
pnpm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your values
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Start development server
npm run dev
```

Frontend runs on **http://localhost:3000** 🎉

#### 3️⃣ Backend Setup
```bash
# Navigate to backend
cd backend

# Create PostgreSQL database
createdb shophub_db
createuser -P shophub_user
# Password: shophub_password

# Update application.yml with your database credentials
# File: src/main/resources/application.yml

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend runs on **http://localhost:8080** 🚀

---

## 📁 Project Structure

```
shophub/
├── 📱 app/                      # Next.js App Router
│   ├── page.tsx                 # Home page
│   ├── products/                # Product pages
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout flow
│   ├── admin/                   # Admin dashboard
│   └── layout.tsx               # Root layout
│
├── 🎨 components/               # React Components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer component
│   ├── ProductCard.tsx          # Product display
│   ├── admin/                   # Admin components
│   └── ui/                      # shadcn/ui components
│
├── ☕ backend/                  # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/ecommerce/
│   │       ├── controller/      # REST Controllers
│   │       ├── service/         # Business Logic
│   │       ├── repository/      # Data Access
│   │       ├── model/           # JPA Entities
│   │       ├── dto/             # Data Transfer Objects
│   │       └── security/        # Security Config
│   │
│   └── src/main/resources/
│       ├── application.yml      # Configuration
│       └── schema.sql           # Database Schema
│
├── 🎯 lib/                      # Utility functions
├── 🪝 hooks/                    # Custom React hooks
├── 📝 docs/                     # Documentation
└── 🐳 docker/                   # Docker configs
```

---

## 🎨 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Product Listing
![Products](docs/screenshots/products.png)

### Shopping Cart
![Cart](docs/screenshots/cart.png)

### Admin Dashboard
![Admin](docs/screenshots/admin.png)

---

## 📚 Documentation

- [Getting Started Guide](GETTING_STARTED.md)
- [Deployment Guide](DEPLOYMENT.md)
- [API Documentation](docs/API.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

## 🔌 API Endpoints

### Authentication
```http
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # User login
POST   /api/auth/refresh         # Refresh token
```

### Products
```http
GET    /api/products             # List products (paginated)
GET    /api/products/{id}        # Get product details
GET    /api/products/search      # Search products
GET    /api/products/category/{id} # Get by category
```

### Cart
```http
GET    /api/cart                 # Get user's cart
POST   /api/cart/add             # Add item to cart
PUT    /api/cart/update/{id}     # Update quantity
DELETE /api/cart/{id}            # Remove item
```

### Orders
```http
POST   /api/orders               # Create order
GET    /api/orders               # List user's orders
GET    /api/orders/{id}          # Get order details
PUT    /api/orders/{id}/cancel   # Cancel order
```

### Admin (Requires ADMIN role)
```http
POST   /api/admin/products       # Create product
PUT    /api/admin/products/{id}  # Update product
DELETE /api/admin/products/{id}  # Delete product
GET    /api/admin/orders         # List all orders
PUT    /api/admin/orders/{id}    # Update order status
GET    /api/admin/analytics      # Get sales analytics
```

---

## 🎯 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NODE_ENV=development
```

### Backend (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shophub_db
    username: shophub_user
    password: shophub_password

jwt:
  secret: your-secret-key-min-32-characters-long
  expiration: 86400000  # 24 hours

stripe:
  api-key: sk_test_xxxxx
  webhook-secret: whsec_xxxxx
```

---

## 🧪 Testing

### Frontend Tests
```bash
npm run test              # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Backend Tests
```bash
cd backend
mvn test                  # Run all tests
mvn test -Dtest=UserServiceTest  # Run specific test
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

### Backend (Docker)
```bash
# Build image
docker build -t shophub-api ./backend

# Run container
docker run -p 8080:8080 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=... \
  shophub-api
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Frontend**: Modern React/Next.js with TypeScript
- **Backend**: Enterprise Java with Spring Boot
- **Design**: Professional UI/UX with Tailwind CSS
- **DevOps**: Docker, CI/CD, Cloud deployment

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Spring Boot](https://spring.io/projects/spring-boot) - Java Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Stripe](https://stripe.com/) - Payment Processing

---

## 📞 Support

- 📧 Email: support@shophub.com
- 💬 Discord: [Join our community](https://discord.gg/shophub)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/shophub/issues)
- 📖 Docs: [Documentation](https://docs.shophub.com)

---

<div align="center">

**Made with ❤️ by the ShopHub Team**

⭐ Star us on GitHub — it motivates us a lot!

[Website](https://shophub.com) • [Documentation](https://docs.shophub.com) • [Blog](https://blog.shophub.com)

</div>
