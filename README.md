# Secure To-Do List Management System

A production-ready secure task management application with JWT authentication, role-based access control, email notifications, and Docker containerization.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)

### Run with Docker
```bash
docker compose up --build
```

### Run Locally (Without Docker)

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🌐 URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Backend API | http://localhost:3001/api | - |
| Grafana | http://localhost:3002 | admin / admin |
| PostgreSQL | localhost:5432 | postgres / postgres_secure_password_2024 |

## 📁 Project Structure

```
project/
├── backend/              # NestJS backend
│   ├── src/
│   │   ├── auth/        # Authentication & JWT
│   │   ├── users/       # User management
│   │   ├── tasks/       # Task CRUD
│   │   ├── mail/        # Email service
│   │   └── config/      # Configuration
│   └── Dockerfile
├── frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── pages/       # Login, Register, Dashboard
│   │   ├── components/  # Reusable components
│   │   ├── api/         # API client
│   │   └── styles/      # CSS styles
│   └── Dockerfile
├── docker-compose.yml   # Docker orchestration
└── .env                 # Environment variables
```

## 🔐 Security Features

✅ **JWT Authentication** - Secure token-based authentication
✅ **bcrypt Password Hashing** - Salted password hashing
✅ **Role-Based Access Control (RBAC)** - Admin and User roles
✅ **Helmet Middleware** - HTTP security headers
✅ **CORS Configuration** - Protected cross-origin requests
✅ **Email Alerts** - Login notifications via SMTP
✅ **Input Validation** - Class-validator DTOs
✅ **Account Locking** - Security features for locked accounts

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get JWT token

### Tasks
- `GET /api/tasks` - List user's tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users` - List all users (Admin only)

## 🔧 Environment Variables

Create `.env` file in root:

```env
JWT_SECRET=your_secret_key_here
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
DATABASE_PASSWORD=postgres_secure_password_2024
```

## 📧 SMTP Configuration (Required)

Email verification is required for user registration and login. Users cannot proceed without receiving an OTP code.

### Gmail Setup (Recommended)

1. **Enable 2-Step Verification**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security" in the left menu
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Copy the 16-character password

3. **Update .env**
   ```env
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ```

4. **Restart Backend**
   ```bash
   docker compose restart backend
   ```

### How It Works
- ✅ User registers → OTP email sent to verify email
- ✅ User enters OTP → Account verified and confirmed
- ✅ User logs in → Security alert email sent
- ✅ Invalid credentials → Error message with SMTP troubleshooting

### Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid credentials" error | Use an App Password (not Gmail password) |
| Email not received | Check spam folder; ensure 2FA is enabled on Gmail |
| SMTP connection failed | Verify firewall allows port 587 |

## 🎨 Features

### Frontend
- Clean, responsive UI with React + Vite
- Token-based authentication
- Task CRUD operations with real-time updates
- Edit/Delete/Complete tasks
- Automatic logout on 401 errors

### Backend
- RESTful API with NestJS
- JWT-based authentication strategy
- Role-based guards for protected routes
- Email notifications on login
- PostgreSQL database with TypeORM
- Input validation with class-validator
- Global error handling

### Monitoring
- Grafana dashboards for system metrics
- PostgreSQL monitoring capabilities

## 🚦 Development Commands

**Backend:**
```bash
cd backend
npm run start:dev      # Start in watch mode
npm run build          # Build for production
npm run lint           # Run linter
```

**Frontend:**
```bash
cd frontend
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
```

## 🐳 Docker Commands

```bash
# Start all services
docker compose up --build

# Stop services
docker compose down

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Rebuild specific service
docker compose up --build backend
```

## 📊 Grafana Setup

1. Open http://localhost:3002
2. Login: `admin` / `admin`
3. Add PostgreSQL as data source
4. Create dashboards for monitoring

## 🛠️ Future Improvements

- [ ] OTP Verification
- [ ] CAPTCHA on login
- [ ] Dark mode toggle
- [ ] File uploads for tasks
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced analytics
- [ ] Email verification
- [ ] Security audit logs
- [ ] Two-factor authentication (2FA)
- [ ] Rate limiting

## 📝 License

MIT

## 🤝 Support

For issues or questions, please create an issue in the repository.
"" 
