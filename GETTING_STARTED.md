# Getting Started with ShopHub

Welcome to ShopHub! This guide will help you set up and run the complete e-commerce application locally.

## 5-Minute Quick Start

### Frontend (Next.js)
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Backend (Spring Boot)
```bash
# Install and run PostgreSQL
brew install postgresql
brew services start postgresql

# Create database
createdb ecommerce_db
createuser ecommerce_user
# Password: ecommerce_password

# Navigate to backend
cd backend

# Build and run
mvn spring-boot:run

# API available at http://localhost:8080/api
```

## Detailed Setup

### Prerequisites

- **Node.js 18+**: https://nodejs.org/
- **Java 17+**: https://www.oracle.com/java/technologies/downloads/
- **PostgreSQL 12+**: https://www.postgresql.org/download/
- **Maven 3.6+**: https://maven.apache.org/download.cgi
- **Git**: https://git-scm.com/

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/shophub.git
cd shophub
```

### Step 2: Setup Frontend

```bash
# Install dependencies
pnpm install
# or
npm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_test_key
EOF

# Start development server
pnpm dev
```

Frontend is now running on **http://localhost:3000**

### Step 3: Setup Database

#### macOS (Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Linux
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Windows
```bash
# Download from https://www.postgresql.org/download/windows/
# Run installer and remember the password
```

#### Create Database and User
```bash
# Connect to PostgreSQL
psql -U postgres

# Run these commands:
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'ecommerce_password';
ALTER ROLE ecommerce_user SET client_encoding TO 'utf8';
ALTER ROLE ecommerce_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ecommerce_user SET default_transaction_deferrable TO on;
ALTER ROLE ecommerce_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
\q
```

### Step 4: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Update application.yml with your database credentials (if different)
# File: src/main/resources/application.yml

# Build the project
mvn clean package

# Run the application
mvn spring-boot:run
```

Backend is now running on **http://localhost:8080/api**

## Testing the Application

### 1. Visit Homepage
```
http://localhost:3000
```

### 2. Create Account
- Click "Sign Up"
- Fill in: First Name, Last Name, Email, Password
- You'll be logged in automatically

### 3. Browse Products
- Click "Shop" or navigate to `/products`
- Use filters and search to find products
- View product details

### 4. Add to Cart
- Click "Add to Cart" on any product
- View cart at `/cart`
- Adjust quantities

### 5. Checkout
- Click "Proceed to Checkout"
- Enter shipping address
- Enter card details (test: 4242 4242 4242 4242)
- Complete purchase

### 6. View Orders
- Go to `/orders` to see order history
- View order details and status

### 7. Admin Dashboard
- Navigate to `/admin`
- View sales analytics
- Manage products and orders

## Project Structure

```
shophub/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Homepage
│   ├── products/page.tsx         # Product listing
│   ├── cart/page.tsx             # Shopping cart
│   ├── checkout/page.tsx         # Checkout page
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page
│   ├── orders/page.tsx           # Order history
│   ├── admin/                    # Admin routes
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── ProductCard.tsx           # Product display card
│   └── admin/                    # Admin components
├── backend/                      # Spring Boot backend
│   ├── src/main/java/            # Java source code
│   ├── src/main/resources/       # Configuration & SQL
│   └── pom.xml                   # Dependencies
└── public/                       # Static assets
```

## Common Commands

### Frontend
```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production build
pnpm start

# Run linting
pnpm lint

# Format code
pnpm format
```

### Backend
```bash
# Build
mvn clean package

# Run
mvn spring-boot:run

# Run tests
mvn test

# Generate JAR
mvn clean package -DskipTests
```

## API Endpoints (Available)

### Authentication
```
POST /auth/register - Register new user
POST /auth/login    - Login user
```

### Products
```
GET /products                    - List all products
GET /products/{id}              - Get product details
GET /products/category/{categoryId} - Get by category
```

### Cart
```
GET /cart           - Get user's cart
POST /cart/add      - Add to cart
PUT /cart/update    - Update quantity
DELETE /cart/{id}   - Remove from cart
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:8080 | xargs kill -9  # Backend
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
psql -U ecommerce_user -d ecommerce_db

# If connection refused, start PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
```

### CORS Issues
- Ensure backend is running on http://localhost:8080
- Check CORS configuration in backend SecurityConfig
- Verify environment variable NEXT_PUBLIC_API_URL is correct

### Dependencies Issues
```bash
# Frontend
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Backend
mvn clean install -U
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxxxx
```

### Backend (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce_db
    username: ecommerce_user
    password: ecommerce_password

jwt:
  secret: your-32-character-secret-key-here
  expiration: 86400000

stripe:
  api-key: sk_test_xxxxx
```

## Testing Credentials

### Test User
```
Email: test@example.com
Password: password123
```

### Test Card (Stripe)
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

## Next Steps

1. **Customize Branding**
   - Update logo in Header.tsx
   - Modify colors in globals.css
   - Update company name throughout app

2. **Connect Real Data**
   - Replace mock products with API calls
   - Implement real authentication
   - Connect Stripe with real keys

3. **Deploy**
   - Frontend: Deploy to Vercel
   - Backend: Deploy to AWS/Heroku/DigitalOcean
   - Database: Use managed PostgreSQL

4. **Features to Add**
   - Email notifications
   - Product search/filtering
   - User reviews
   - Wishlist functionality
   - Multi-currency support

## Documentation

- **README.md**: Project overview and features
- **DEPLOYMENT.md**: Production deployment guide
- **backend/README.md**: Backend-specific documentation
- **API Documentation**: Coming soon

## Getting Help

- Check the troubleshooting section above
- Review existing GitHub issues
- Create a new issue with details
- Contact support@shophub.com

## Development Tips

1. **Use VS Code Extensions**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Spring Boot Extension Pack

2. **Database Debugging**
   - Use pgAdmin: http://localhost:5050
   - Or CLI: `psql -U ecommerce_user -d ecommerce_db`

3. **API Testing**
   - Use Postman or Insomnia
   - Create collection from API endpoints
   - Save requests for testing

4. **Hot Reload**
   - Frontend: Automatic with Next.js
   - Backend: Use Spring DevTools for auto-restart

## Performance Tips

1. **Frontend**
   - Use React DevTools for profiling
   - Check bundle size: `pnpm build`
   - Enable image optimization

2. **Backend**
   - Use Spring Boot Actuator for metrics
   - Enable query logging in application.yml
   - Monitor database connection pool

## Security Notes

- Change default passwords immediately
- Never commit .env files
- Use strong JWT secret (32+ characters)
- Keep dependencies updated
- Enable HTTPS in production

## Ready to Launch?

Once you've tested locally and everything works:

1. Push code to GitHub
2. Connect repository to Vercel (frontend)
3. Deploy backend to your server
4. Configure production database
5. Set up real Stripe account
6. Point domain to your servers
7. Monitor logs and metrics

---

**Need help?** Check the README.md for comprehensive documentation or reach out to the team!
