# ShopHub Deployment Guide

This guide covers deploying ShopHub to production environments.

## Prerequisites

- Domain name (optional but recommended)
- SSL certificate (automatic with Vercel/Let's Encrypt)
- Stripe account (production keys)
- PostgreSQL database server
- Docker (for containerized backend)

## Frontend Deployment (Vercel)

### 1. Connect GitHub Repository

```bash
# Push your code to GitHub
git push origin main
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 3. Configure Environment Variables in Vercel Dashboard

- Go to Project Settings → Environment Variables
- Add all required environment variables
- Redeploy the project

## Backend Deployment

### Option 1: Docker (Recommended)

#### Create Dockerfile
```dockerfile
FROM maven:3.8.1-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Build and Push to Docker Hub
```bash
# Build image
docker build -t yourusername/ecommerce-api:latest .

# Push to Docker Hub
docker login
docker push yourusername/ecommerce-api:latest
```

#### Deploy to Cloud (AWS ECS, Google Cloud Run, etc.)
```bash
# Example: AWS ECS
# 1. Create ECS cluster
# 2. Create task definition
# 3. Create service
# 4. Configure ALB for load balancing
```

### Option 2: Traditional Server (EC2, DigitalOcean, etc.)

#### 1. SSH into Server
```bash
ssh ubuntu@your-server-ip
```

#### 2. Install Dependencies
```bash
# Java
sudo apt-get update
sudo apt-get install openjdk-17-jdk-headless

# PostgreSQL Client
sudo apt-get install postgresql-client

# Git
sudo apt-get install git
```

#### 3. Clone and Deploy
```bash
cd /opt
sudo git clone https://github.com/yourusername/shophub.git
cd shophub/backend

# Build
mvn clean package

# Create systemd service
sudo nano /etc/systemd/system/ecommerce.service
```

#### 4. Systemd Service Configuration
```ini
[Unit]
Description=ShopHub E-Commerce API
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/shophub/backend
ExecStart=/usr/bin/java -jar target/ecommerce-api-1.0.0.jar
Restart=always
RestartSec=10
User=ubuntu

[Install]
WantedBy=multi-user.target
```

#### 5. Start Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable ecommerce
sudo systemctl start ecommerce
sudo systemctl status ecommerce
```

### Option 3: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli --upgrade --user

# Initialize
eb init -p java-17 ecommerce

# Create environment
eb create ecommerce-prod

# Deploy
eb deploy

# View logs
eb logs
```

## Database Setup (Production)

### Option 1: Managed Database (AWS RDS)

```bash
# 1. Create RDS instance via AWS Console
#    - Engine: PostgreSQL 14+
#    - Multi-AZ: Yes (for high availability)
#    - Backup retention: 30 days
#    - Encryption: Enabled

# 2. Configure security group to allow your backend

# 3. Update application.yml
spring:
  datasource:
    url: jdbc:postgresql://your-rds-endpoint:5432/ecommerce_db
    username: dbuser
    password: ${DB_PASSWORD}  # Use environment variable
```

### Option 2: Self-Hosted PostgreSQL

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Connect and setup
sudo su - postgres
psql

# Create database and user
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'secure-password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

# Enable backups
sudo pg_dump -U ecommerce_user ecommerce_db > backup.sql
```

## SSL/TLS Certificate

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Configure in Backend

Update `application.yml`:
```yaml
server:
  port: 8443
  ssl:
    key-store: /path/to/keystore.jks
    key-store-password: ${SSL_PASSWORD}
    key-store-type: JKS
```

## Nginx Reverse Proxy Configuration

```nginx
upstream backend {
    server localhost:8080;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## Environment Configuration (Production)

### Backend (application.yml)
```yaml
spring:
  profiles:
    active: prod
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USER}
    password: ${DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate

jwt:
  secret: ${JWT_SECRET}  # Use strong 32+ character key
  expiration: 86400000

stripe:
  api-key: ${STRIPE_LIVE_KEY}
  webhook-secret: ${STRIPE_WEBHOOK_SECRET}

server:
  error:
    include-message: never
  compression:
    enabled: true
  tomcat:
    threads:
      max: 200
```

### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxxxx
```

## Monitoring & Logging

### Application Logging

```yaml
logging:
  level:
    root: WARN
    com.ecommerce: INFO
  file:
    name: /var/log/ecommerce/app.log
    max-size: 100MB
    max-history: 30
```

### Health Checks

```bash
# Add health endpoint
GET /actuator/health
GET /actuator/metrics
```

### Monitoring Tools

- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **ELK Stack**: Centralized logging
- **Datadog**: APM monitoring

## Performance Optimization

1. **Caching**
   - Enable Redis caching
   - Cache product listings

2. **Database**
   - Use connection pooling (HikariCP)
   - Optimize queries with proper indexing
   - Enable read replicas

3. **Frontend**
   - Enable CDN (CloudFlare, CloudFront)
   - Image optimization
   - Code splitting

4. **Backend**
   - Enable compression
   - Use async processing for heavy operations
   - Implement rate limiting

## Backup & Disaster Recovery

```bash
# Automated backups (Daily)
0 2 * * * pg_dump -U ecommerce_user ecommerce_db | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz

# Backup retention (30 days)
find /backups -name "*.sql.gz" -mtime +30 -delete

# Test restore
psql ecommerce_db < backup.sql
```

## Rollback Procedures

```bash
# Docker rollback
docker service update --image yourusername/ecommerce-api:previous ecommerce-api

# Git rollback
git revert <commit-hash>
git push origin main

# Database rollback
restore from backup SQL file
```

## Security Checklist

- [ ] HTTPS enabled on all endpoints
- [ ] Environment variables for sensitive data
- [ ] Database backups automated
- [ ] Firewall rules configured
- [ ] DDoS protection enabled
- [ ] Rate limiting configured
- [ ] Input validation enabled
- [ ] SQL injection prevention tested
- [ ] CORS properly configured
- [ ] JWT secret rotated
- [ ] Stripe keys are live (not test)
- [ ] Admin credentials changed from default

## Maintenance

### Regular Tasks
- Monitor application logs
- Check database performance
- Update dependencies
- Review security patches
- Monitor API rate limits
- Check storage usage

### Monthly
- Review analytics
- Optimize slow queries
- Update documentation
- Security audit

### Quarterly
- Full backup recovery test
- Performance benchmarking
- Security penetration testing

## Support & Troubleshooting

### Common Issues

1. **503 Service Unavailable**
   - Check if backend is running
   - Verify database connection
   - Check server resources (CPU, RAM)

2. **Timeout Errors**
   - Increase database connection pool
   - Optimize slow queries
   - Add caching layer

3. **Payment Failures**
   - Verify Stripe keys
   - Check webhook configuration
   - Review error logs

---

For additional help, refer to the main README.md or contact support@shophub.com
