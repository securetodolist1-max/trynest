# 🔐 Secure To-Do List Management System

## Project Overview

A complete, production-ready full-stack application for secure task management with:

- **Backend:** NestJS with JWT authentication, role-based access control, and email notifications
- **Frontend:** React 18 + Vite with modern UI and state management
- **Database:** PostgreSQL with TypeORM
- **Monitoring:** Grafana for system metrics
- **Containerization:** Docker & Docker Compose for easy deployment

---

## 📊 Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  ┌──────────────┬──────────────┬──────────────────────────┐  │
│  │   Login      │  Register    │     Dashboard (Tasks)   │  │
│  │   Page       │   Page       │                          │  │
│  └──────────────┴──────────────┴──────────────────────────┘  │
│                         ↓ (HTTP/HTTPS)                       │
├─────────────────────────────────────────────────────────────┤
│                Backend (NestJS REST API)                      │
│  ┌──────────┬─────────┬──────────┬─────────────────────────┐ │
│  │   Auth   │  Users  │  Tasks   │   Mail (SMTP)           │ │
│  │ Module   │ Module  │ Module   │   Module                │ │
│  └──────────┴─────────┴──────────┴─────────────────────────┘ │
│                         ↓ (TypeORM)                          │
├─────────────────────────────────────────────────────────────┤
│              Database (PostgreSQL)                            │
│  ┌──────────────┬──────────────┐                             │
│  │   Users      │    Tasks     │                             │
│  │   Table      │    Table     │                             │
│  └──────────────┴──────────────┘                             │
├─────────────────────────────────────────────────────────────┤
│           Monitoring (Grafana)                               │
│           Metrics & Dashboards                               │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### Security Features ✅
- ✅ JWT-based authentication
- ✅ bcrypt password hashing with salt rounds
- ✅ Role-based access control (RBAC) - Admin & User roles
- ✅ Input validation with class-validator
- ✅ Helmet middleware for HTTP security headers
- ✅ CORS configuration for frontend protection
- ✅ Account locking mechanism
- ✅ Automatic token validation on requests

### User Features ✅
- ✅ User registration and login
- ✅ Profile management
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete
- ✅ Real-time task updates
- ✅ Responsive UI design
- ✅ Email notifications on login

### Admin Features ✅
- ✅ View all users
- ✅ Lock/unlock user accounts
- ✅ Monitor user activity via Grafana

---

## 🚀 Installation & Setup

### Prerequisites
- Docker & Docker Compose (Recommended)
- Node.js 20+ (For local development)
- PostgreSQL (Optional - included in Docker)
- npm or yarn

### Option 1: Docker (Recommended) ⭐

**Start all services:**
```bash
cd c:\Users\cmark\Desktop\trynest
docker compose up --build
```

**Services will be available at:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Grafana: http://localhost:3002
- PostgreSQL: localhost:5432

### Option 2: Local Development

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend (in another terminal):**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Default Credentials

| Service | Username | Password |
|---------|----------|----------|
| Grafana | admin | admin |
| PostgreSQL | postgres | postgres_secure_password_2024 |

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints

**Register**
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 201 Created
{
  "id": "uuid",
  "email": "john@example.com",
  "name": "John Doe"
}
```

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### Tasks Endpoints (Requires JWT Token)

**Get All Tasks**
```http
GET /tasks
Authorization: Bearer <access_token>

Response: 200 OK
[
  {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-05-10T10:00:00Z",
    "updatedAt": "2024-05-10T10:00:00Z"
  }
]
```

**Create Task**
```http
POST /tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the security audit",
  "completed": false
}

Response: 201 Created
```

**Get Single Task**
```http
GET /tasks/:id
Authorization: Bearer <access_token>
```

**Update Task**
```http
PATCH /tasks/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Toggle Task Completion**
```http
PATCH /tasks/:id/toggle
Authorization: Bearer <access_token>
```

**Delete Task**
```http
DELETE /tasks/:id
Authorization: Bearer <access_token>
```

### Users Endpoints

**Get User Profile**
```http
GET /users/:id
Authorization: Bearer <access_token>
```

**Get All Users (Admin Only)**
```http
GET /users
Authorization: Bearer <access_token>
```

---

## 📁 File Structure

```
trynest/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.service.ts       # JWT & password logic
│   │   │   ├── auth.controller.ts    # Register & login endpoints
│   │   │   ├── auth.module.ts        # Auth module definition
│   │   │   ├── jwt.strategy.ts       # JWT validation strategy
│   │   │   ├── jwt.guard.ts          # JWT protection guard
│   │   │   ├── roles.guard.ts        # Role-based access guard
│   │   │   └── roles.decorator.ts    # Role metadata decorator
│   │   │
│   │   ├── users/
│   │   │   ├── user.entity.ts        # User database schema
│   │   │   ├── users.service.ts      # User business logic
│   │   │   ├── users.controller.ts   # User endpoints
│   │   │   └── users.module.ts       # Users module definition
│   │   │
│   │   ├── tasks/
│   │   │   ├── task.entity.ts        # Task database schema
│   │   │   ├── task.dto.ts           # Task data validation
│   │   │   ├── tasks.service.ts      # Task business logic
│   │   │   ├── tasks.controller.ts   # Task endpoints
│   │   │   └── tasks.module.ts       # Tasks module definition
│   │   │
│   │   ├── mail/
│   │   │   ├── mail.service.ts       # Email sending logic
│   │   │   └── mail.module.ts        # Mail module definition
│   │   │
│   │   ├── config/
│   │   │   └── database.config.ts    # Database connection config
│   │   │
│   │   ├── app.module.ts             # Root module
│   │   ├── app.controller.ts         # Root controller
│   │   ├── app.service.ts            # Root service
│   │   └── main.ts                   # Application entry point
│   │
│   ├── package.json                  # Backend dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── nest-cli.json                 # NestJS CLI config
│   ├── .env                          # Environment variables
│   ├── .eslintrc.json                # ESLint configuration
│   ├── .prettierrc                   # Prettier configuration
│   └── Dockerfile                    # Docker image definition
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   └── Dashboard.jsx         # Task dashboard page
│   │   │
│   │   ├── components/
│   │   │   ├── AddTaskForm.jsx       # Form to add new task
│   │   │   └── TaskList.jsx          # List and manage tasks
│   │   │
│   │   ├── api/
│   │   │   └── api.js                # Axios API client
│   │   │
│   │   ├── styles/
│   │   │   ├── Auth.css              # Authentication page styles
│   │   │   ├── Dashboard.css         # Dashboard page styles
│   │   │   ├── AddTaskForm.css       # Form styles
│   │   │   └── TaskList.css          # Task list styles
│   │   │
│   │   ├── App.jsx                   # Root component
│   │   ├── App.css                   # Root styles
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   │
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── .env                          # Frontend environment variables
│   ├── .eslintrc.json                # ESLint configuration
│   ├── .prettierrc                   # Prettier configuration
│   └── Dockerfile                    # Docker image definition
│
├── docker-compose.yml                # Docker compose configuration
├── .env                              # Root environment variables
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
└── SETUP.md                          # Setup instructions
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3001

DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres_secure_password_2024
DATABASE_NAME=securitydb

JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
CORS_ORIGIN=http://localhost:3000

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

---

## 🐛 Troubleshooting

### Issue: Port Already in Use

**Solution:**
```bash
# Find and kill process using port
lsof -ti:3000,3001,3002,5432 | xargs kill -9

# Or change ports in docker-compose.yml
```

### Issue: Database Connection Error

**Solution:**
```bash
# Ensure PostgreSQL container is healthy
docker compose ps

# View logs
docker compose logs postgres

# Restart services
docker compose down
docker compose up --build
```

### Issue: CORS Error in Browser

**Solution:**
1. Ensure CORS_ORIGIN in backend .env matches frontend URL
2. Check frontend .env VITE_API_URL matches backend URL
3. Restart both services

### Issue: 401 Unauthorized Error

**Solution:**
- Token may have expired (24-hour expiration)
- Re-login to get a new token
- Check that token is being sent in Authorization header

### Issue: Email Not Sending

**Solution:**
- Verify SMTP credentials in .env
- For Gmail: Use "App Password" not regular password
- Enable "Less secure apps" if using older accounts
- Check SMTP service is accessible from your network

---

## 🚀 Production Deployment

### Important Security Steps

1. **Change JWT_SECRET:**
   ```env
   JWT_SECRET=<random-secure-string-32-chars-minimum>
   ```

2. **Update Database Credentials:**
   ```env
   DATABASE_PASSWORD=<strong-random-password>
   ```

3. **Configure Email Service:**
   ```env
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-app-specific-password
   ```

4. **Set NODE_ENV:**
   ```env
   NODE_ENV=production
   ```

5. **Enable HTTPS:**
   - Use nginx reverse proxy
   - Install SSL certificate (Let's Encrypt)

6. **Database Backups:**
   - Configure automated PostgreSQL backups
   - Test restore procedures

7. **Monitoring:**
   - Set up Grafana dashboards
   - Configure alerting rules
   - Monitor API response times

---

## 📖 Development Workflow

### Backend Development

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run start:dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run linting:**
   ```bash
   npm run lint
   ```

### Frontend Development

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🔒 Security Checklist

- ✅ JWT tokens expire after 24 hours
- ✅ Passwords are hashed with bcrypt (10 salt rounds)
- ✅ Helmet middleware adds security headers
- ✅ CORS is configured to allow only frontend origin
- ✅ Input validation on all API endpoints
- ✅ Role-based access control for admin endpoints
- ✅ Database credentials stored in environment variables
- ✅ Sensitive data not logged in production
- ⚠️ Email credentials should be rotated regularly
- ⚠️ HTTPS required in production

---

## 📊 Grafana Setup

1. **Access Grafana:**
   ```
   http://localhost:3002
   ```

2. **Login with:**
   - Username: `admin`
   - Password: `admin`

3. **Add PostgreSQL Data Source:**
   - Click "Add data source"
   - Select PostgreSQL
   - Host: `postgres:5432`
   - Database: `securitydb`
   - User: `postgres`
   - Password: `postgres_secure_password_2024`

4. **Create Dashboard:**
   - Create new dashboard
   - Add panels for:
     - Login attempts over time
     - Task count by user
     - User activity metrics

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

---

## 📝 License

MIT License - Feel free to use this project for any purpose.

---

## 🆘 Support & Issues

For issues or questions:
1. Check existing documentation
2. Review API error messages
3. Check application logs
4. Create an issue with detailed description

---

## 🎯 Future Roadmap

- [ ] Two-Factor Authentication (2FA)
- [ ] OTP Verification via Email/SMS
- [ ] CAPTCHA Protection
- [ ] Dark Mode UI
- [ ] File Upload Support
- [ ] WebSocket Real-time Notifications
- [ ] Advanced Analytics Dashboard
- [ ] Email Verification on Registration
- [ ] Rate Limiting & Throttling
- [ ] API Request Logging & Audit Trail
- [ ] Team Collaboration Features
- [ ] Task Categories/Tags
- [ ] Task Due Dates & Reminders
- [ ] Search & Filter Functionality

---

**Happy Coding! 🚀**
