#!/bin/bash

# ShopHub Setup Script
# This script automates the setup process for ShopHub

echo "🛍️  ShopHub Setup Script"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"

# Check if Java is installed
echo -e "${BLUE}Checking Java...${NC}"
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java is not installed. Please install Java 17+ first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Java $(java -version 2>&1 | head -n 1) found${NC}"

# Check if PostgreSQL is installed
echo -e "${BLUE}Checking PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not installed. Please install PostgreSQL 12+ first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL found${NC}"

echo ""
echo "📦 Installing Frontend Dependencies..."
npm install

echo ""
echo "📝 Setting up environment files..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ Created .env.local${NC}"
    echo -e "${BLUE}⚠️  Please update .env.local with your configuration${NC}"
else
    echo -e "${BLUE}ℹ️  .env.local already exists${NC}"
fi

echo ""
echo "🗄️  Setting up Database..."
read -p "Do you want to create the database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter database name (default: shophub_db): " DB_NAME
    DB_NAME=${DB_NAME:-shophub_db}
    
    read -p "Enter database user (default: shophub_user): " DB_USER
    DB_USER=${DB_USER:-shophub_user}
    
    read -sp "Enter database password (default: shophub_password): " DB_PASS
    DB_PASS=${DB_PASS:-shophub_password}
    echo
    
    # Create database and user
    psql -U postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null
    psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null
    psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null
    
    echo -e "${GREEN}✅ Database setup complete${NC}"
fi

echo ""
echo "☕ Building Backend..."
cd backend
mvn clean install -DskipTests
echo -e "${GREEN}✅ Backend build complete${NC}"
cd ..

echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "To start the application:"
echo ""
echo "Frontend:"
echo "  npm run dev"
echo ""
echo "Backend:"
echo "  cd backend"
echo "  mvn spring-boot:run"
echo ""
echo "Visit http://localhost:3000 to see your application!"
echo ""
