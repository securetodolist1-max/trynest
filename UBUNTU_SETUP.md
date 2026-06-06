# Secure To-Do Application - Ubuntu Setup Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Initial Setup (One-time only)
```bash
chmod +x setup.sh
./setup.sh
```

This script will:
- Install Docker and Docker Compose
- Install Node.js and npm
- Install Git
- Build the backend application
- Configure Docker permissions

### Step 2: Start Services
```bash
./start.sh
```

Services will be available in 30-60 seconds:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Grafana**: http://localhost:3002 (admin/admin)
- **Jenkins**: http://localhost:8080
- **Mailhog**: http://localhost:8025

### Step 3: Login
```
Email: admin@example.com
Password: admin123
```

Admin login skips OTP and goes directly to dashboard.

---

## 📋 Available Scripts

| Script | Purpose |
|--------|---------|
| `./setup.sh` | Install all prerequisites (run once) |
| `./start.sh` | Start all services |
| `./stop.sh` | Stop all services |
| `./restart.sh` | Restart all services |
| `./status.sh` | Check service status |
| `./logs.sh` | View service logs |
| `./help.sh` | Display this help |
| `./clean.sh` | Complete cleanup (deletes all data) |

---

## 🔧 Common Tasks

### Check Service Status
```bash
./status.sh
```

### View Logs
```bash
# All services
./logs.sh

# Specific service
./logs.sh backend
./logs.sh frontend
./logs.sh postgres
./logs.sh jenkins
```

### Restart Services
```bash
./restart.sh
```

### Stop Everything
```bash
./stop.sh
```

---

## 🌐 Access Points

| Service | URL | Default Credentials |
|---------|-----|-------------------|
| Frontend | http://localhost:3000 | admin@example.com / admin123 |
| Backend API | http://localhost:3001/api | N/A |
| Grafana | http://localhost:3002 | admin / admin |
| Jenkins | http://localhost:8080 | Setup wizard on first run |
| Mailhog | http://localhost:8025 | N/A (email tester) |
| PostgreSQL | localhost:5432 | postgres / postgres_secure_password_2024 |

---

## 👤 User Management

### Admin Account (Pre-created)
- Email: `admin@example.com`
- Password: `admin123`
- OTP: **Skipped** - direct login to dashboard

### Creating New Users
1. Click "Register" on login page
2. Enter email, password, name
3. Check your email for OTP code
4. Enter OTP to verify
5. Login with email and password (requires OTP on login)

---

## 📧 Email Configuration

The system uses **Gmail SMTP** to send OTP codes.

### Current Configuration
- **Email**: kyletaborada3@gmail.com
- **App Password**: zfrr gxhx ihqf gtis

### To Change Email
1. Edit `docker-compose.yml`
2. Update these fields under `backend` service:
   ```yaml
   SMTP_USER: your-email@gmail.com
   SMTP_PASS: your-app-password
   SMTP_FROM: your-email@gmail.com
   ```
3. Run `./restart.sh`

### Getting Gmail App Password
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Search for "App passwords"
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password

---

## 🚨 Troubleshooting

### Services Won't Start

**Check Docker is running:**
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

**Check logs:**
```bash
./logs.sh backend
./logs.sh postgres
```

### Port Already in Use

**Find and kill process:**
```bash
# For port 3000
sudo lsof -i :3000
sudo kill -9 <PID>

# For port 3001
sudo lsof -i :3001
```

### Permission Denied on Scripts

```bash
chmod +x *.sh
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
./status.sh

# View database logs
./logs.sh postgres

# Force restart
./stop.sh
./start.sh
```

### Out of Disk Space

```bash
# Clean up Docker
docker system prune -a

# Free space
./clean.sh  # WARNING: Deletes all data
./setup.sh  # Reinstall
```

### Can't Access Frontend

1. Check if running: `./status.sh`
2. Check logs: `./logs.sh frontend`
3. Restart: `./restart.sh`
4. Clear browser cache and try incognito window

### Jenkins Won't Start

```bash
# Get initial admin password
docker exec secure_todo_jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# View Jenkins logs
./logs.sh jenkins
```

---

## 📊 Monitoring & Dashboards

### Grafana (Metrics & Dashboards)
- URL: http://localhost:3002
- Login: admin / admin
- Pre-configured dashboards for system metrics

### Mailhog (Email Testing)
- URL: http://localhost:8025
- View all emails sent by the system
- Test OTP codes without real email

### Jenkins (CI/CD)
- URL: http://localhost:8080
- Automated testing and deployment
- Pipeline configured in `Jenkinsfile`

---

## 🔐 Security Notes

- Admin account has no OTP requirement
- Regular users require OTP for login
- All passwords are bcrypt hashed
- JWT tokens expire after 24 hours
- HTTPS not configured (dev environment)

---

## 💾 Database Management

### PostgreSQL Details
- **Host**: postgres (container name)
- **Port**: 5432
- **User**: postgres
- **Password**: postgres_secure_password_2024
- **Database**: securitydb

### Connect to Database
```bash
docker-compose exec postgres psql -U postgres -d securitydb
```

### Backup Database
```bash
docker-compose exec postgres pg_dump -U postgres securitydb > backup.sql
```

### Restore Database
```bash
docker-compose exec postgres psql -U postgres securitydb < backup.sql
```

---

## 🐳 Docker Commands Reference

### View Containers
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f
```

### Execute Command in Container
```bash
docker-compose exec backend npm run build
docker-compose exec postgres psql -U postgres
```

### Rebuild Services
```bash
docker-compose build
docker-compose up -d
```

---

## 📝 System Requirements

- **OS**: Ubuntu 20.04 LTS or newer
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 20GB free space
- **CPU**: 2 cores minimum
- **Internet**: For initial setup only

---

## 🔄 System Architecture

```
┌─────────────────────────────────────────────┐
│         Frontend (React/Vite)               │
│         http://localhost:3000               │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│      Backend API (NestJS)                   │
│      http://localhost:3001/api              │
└──────────────────┬──────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
 PostgreSQL    Redis         Gmail SMTP
  (DB)         (Cache)       (Email)
```

---

## 🎯 Features

✅ Admin login without OTP
✅ User registration with OTP verification
✅ Real Gmail email sending
✅ Task management dashboard
✅ User administration panel
✅ Real-time metrics (Grafana)
✅ CI/CD pipeline (Jenkins)
✅ Email testing (Mailhog)
✅ Docker containerization
✅ PostgreSQL database
✅ JWT authentication

---

## 📞 Support & Help

For command help:
```bash
./help.sh
```

Check logs:
```bash
./logs.sh <service>
```

View status:
```bash
./status.sh
```

---

## ⚙️ Environment Variables

Edit `docker-compose.yml` to change:
- Node environment
- Database credentials
- JWT secret
- CORS origin
- SMTP configuration
- Application ports

---

## 🎓 Learning Resources

- Backend API: NestJS (TypeScript)
- Frontend: React + Vite
- Database: PostgreSQL
- Monitoring: Prometheus + Grafana
- CI/CD: Jenkins
- Containerization: Docker & Docker Compose

---

**Last Updated**: 2026-05-24
**Version**: 1.0.0
