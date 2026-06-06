# Quick Start Deployment Guide

## 🚀 5-Minute Quick Start

### Prerequisites
- Jenkins running: http://localhost:8080
- Email configured: securetodolist1@gmail.com
- GitHub account
- Git installed locally

---

## Step 1: Create GitHub Repository (2 min)

```bash
# Create repo on https://github.com/new
# Name: secure-todo-app
# Clone locally
git clone https://github.com/YOUR-USERNAME/secure-todo-app.git
cd secure-todo-app

# Add these files from this package:
# - Jenkinsfile
# - Dockerfile
# - docker-compose.yml
# - package.json (your Node.js app)

# Commit and push
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

---

## Step 2: GitHub Webhook Setup (2 min)

1. Create GitHub token:
   - https://github.com/settings/tokens → Generate new token
   - Select: `repo`, `admin:repo_hook`
   - Copy token

2. Add to Jenkins:
   - Jenkins → Manage Jenkins → Manage Credentials → Add
   - Kind: Username with password
   - Username: your GitHub username
   - Password: paste token
   - ID: `github-credentials`

3. Add webhook to GitHub:
   - GitHub → Repository Settings → Webhooks → Add
   - Payload URL: `http://localhost:8080/github-webhook/`
   - Content type: `application/json`
   - Events: Push, Pull Request
   - Active: ✓

---

## Step 3: Create Jenkins Job (1 min)

1. Jenkins → New Item
   - Name: `secure-todo-app-pipeline`
   - Type: Pipeline

2. Configure:
   - GitHub project: `https://github.com/YOUR-USERNAME/secure-todo-app/`
   - Build Triggers: ✓ GitHub hook trigger
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: `https://github.com/YOUR-USERNAME/secure-todo-app.git`
   - Credentials: `github-credentials`
   - Script Path: `Jenkinsfile`

3. Save

---

## Step 4: Test Pipeline

### Option A: Manual Build (Test)
```
Jenkins → secure-todo-app-pipeline → Build with Parameters
- ENVIRONMENT: staging
- ACTION: build_and_deploy
- NOTIFY_TEAM: ✓
Click: Build
```

### Option B: GitHub Push (Automatic)
```bash
git add .
git commit -m "Test pipeline"
git push origin main
# Jenkins automatically triggers build
```

---

## Step 5: Verify Notifications

1. Jenkins finishes build
2. Check email: securetodolist1@gmail.com
3. Should receive HTML email with:
   - Build status (✓ SUCCESS)
   - Job name
   - Build number
   - Environment
   - Build duration
   - Links to build details

---

## 📊 Pipeline Parameters

When building, you can choose:

**ENVIRONMENT**: staging OR production
**ACTION**: 
- `build` — Build and test only
- `deploy` — Deploy existing image
- `build_and_deploy` — Build + deploy

**NOTIFY_TEAM**: true (send email) OR false

---

## 🐳 What Gets Deployed

### Staging Environment
- Port: 3001
- Container: `secure-todo-app-staging`
- Network: `app-network`
- Health check: Every 30s

### Production Environment
- Port: 3000 (requires approval)
- Container: `secure-todo-app-prod`
- Backup: Automatic backup before deploy
- Health check: Every 30s

---

## 🔍 Monitor Your Pipeline

**Jenkins Dashboard**: http://localhost:8080
- Click job name to see build history
- Click build number to see details
- Click "Console Output" for real-time logs

**View Latest Build**: http://localhost:8080/job/secure-todo-app-pipeline/

**Email Notifications**: securetodolist1@gmail.com
- Success emails (green)
- Failure emails (red) with error details
- Unstable emails (orange) with warnings

---

## ✅ Checklist

- [ ] GitHub repository created
- [ ] Jenkinsfile pushed to GitHub
- [ ] GitHub token generated
- [ ] GitHub credentials added to Jenkins
- [ ] GitHub webhook configured
- [ ] Jenkins job created
- [ ] First build triggered
- [ ] Email notification received
- [ ] Staging deployment verified
- [ ] Production ready for deployment

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build not triggering | Check GitHub webhook deliveries, ensure Jenkins URL is public |
| Email not sending | Verify SMTP settings, test email manually |
| Docker build fails | Check Dockerfile, verify docker is running |
| Permission denied | Run Jenkins with proper permissions, check docker group |

---

## 📝 File Reference

| File | Purpose |
|------|---------|
| `Jenkinsfile` | Complete pipeline definition with all stages |
| `Dockerfile` | Build Docker image for your app |
| `docker-compose.yml` | Deploy multiple environments |
| `.gitignore` | Prevent sensitive files from git |
| `package.json` | Node.js dependencies (create based on your app) |

---

## 🎯 Next Steps

1. **Customize Jenkinsfile**: Update stages for your specific app
2. **Add Tests**: Add test scripts to package.json
3. **Configure Registry**: Set up Docker Hub credentials for image push
4. **Add Monitoring**: Integrate health checks and monitoring
5. **Set Alerts**: Configure additional notification channels

---

## 📞 Support

Having issues? Check:
- Jenkins logs: `docker logs jenkins-server`
- GitHub webhook: GitHub → Settings → Webhooks → Recent Deliveries
- Email settings: Jenkins → Configure System → Email Notification

---

**Your CI/CD pipeline is ready to deploy! 🚀**
