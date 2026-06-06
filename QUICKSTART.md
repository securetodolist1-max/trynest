# ⚡ Quick Start Guide

## Get Started in 5 Minutes

### Using Docker (Easiest)

```bash
cd c:\Users\cmark\Desktop\trynest
docker compose up --build
```

Wait for all services to start (about 30 seconds), then:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001/api
- **Grafana:** http://localhost:3002 (admin/admin)

### Local Development

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Test the Application

### 1. Create an Account

Go to http://localhost:3000/register and fill in:
- Name: John Doe
- Email: john@example.com
- Password: password123

### 2. Login

Navigate to http://localhost:3000/login and use:
- Email: john@example.com
- Password: password123

### 3. Create a Task

On the dashboard:
- Title: "Buy groceries"
- Description: "Milk, eggs, bread"
- Click "Add Task"

### 4. Manage Tasks

- ✅ Check box to complete
- ✏️ Edit to modify
- 🗑️ Delete to remove

---

## API Testing with cURL

### Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "email":"john@test.com",
    "password":"pass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@test.com",
    "password":"pass123"
  }'
```

Save the `access_token` from the response.

### Get Tasks
```bash
curl http://localhost:3001/api/tasks \
  -H "Authorization: Bearer <your_access_token>"
```

### Create Task
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_access_token>" \
  -d '{
    "title":"Test Task",
    "description":"Test Description"
  }'
```

---

## Stop Services

```bash
# Docker
docker compose down

# Remove data (clean slate)
docker compose down -v
```

---

## Common Issues

### Port in use?
```bash
lsof -ti:3000,3001,3002,5432 | xargs kill -9
```

### Need help?
- Check DOCUMENTATION.md for detailed API docs
- Check logs: `docker compose logs -f backend`
- Review .env files for configuration

---

## What's Inside?

✅ **Complete Backend:**
- JWT Authentication
- bcrypt Password Hashing
- Role-Based Access Control
- Email Notifications
- Database with TypeORM
- Input Validation

✅ **Complete Frontend:**
- React Components
- Responsive Design
- Token Management
- Error Handling
- Task Management UI

✅ **Database:**
- PostgreSQL
- Auto-migrations
- User & Task tables
- Relationships configured

✅ **Monitoring:**
- Grafana integration
- System metrics
- PostgreSQL monitoring

✅ **Docker Setup:**
- Full containerization
- Docker Compose orchestration
- Health checks
- Volume persistence

---

**Next Steps:**
1. Customize the .env file for your setup
2. Review DOCUMENTATION.md for API details
3. Deploy to production when ready
4. Set up SSL certificates
5. Configure backups
6. Monitor with Grafana

---

**Happy coding! 🚀**
