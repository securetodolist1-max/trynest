# Secure To-Do List Management System

Complete NestJS + React full-stack application with security best practices.

## Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Environment Variables

Create `.env` files:

**backend/.env** - Already configured with defaults

**frontend/.env** - Already configured with defaults

### 3. Database Setup

The PostgreSQL database will auto-initialize when using Docker Compose:

```bash
docker compose up --build
```

### 4. Development

Run backend and frontend in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `docker compose up --build` | Start all services |
| `docker compose down` | Stop all services |
| `npm run start:dev` (backend) | Start backend with watch |
| `npm run dev` (frontend) | Start frontend dev server |

## API Base URL

- Local: `http://localhost:3001/api`
- Docker: Backend is accessible via `http://backend:3001/api`

## Troubleshooting

**Port already in use:**
```bash
# Change ports in docker-compose.yml or kill the process
lsof -ti:3000,3001,3002,5432 | xargs kill -9
```

**Database connection error:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database credentials

**CORS errors:**
- Frontend must be on correct CORS_ORIGIN
- Check backend .env CORS_ORIGIN setting

## Security Notes

- Never commit `.env` files with real credentials
- Use environment variables for secrets
- Change JWT_SECRET in production
- Rotate SMTP credentials regularly
- Use HTTPS in production
