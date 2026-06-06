# 🚀 Complete Ready-to-Deploy Guide
## GitHub + Jenkins + Gmail CI/CD Pipeline

---

## ✅ Prerequisites

- ✓ Jenkins running: http://localhost:8080
- ✓ Password: **48f12177089c44068fc0253254f38401**
- ✓ Gmail: securetodolist1@gmail.com
- ✓ App Password: sweq wftk gzey molk
- ✓ SMTP configured
- ✓ Docker installed
- ✓ Git installed
- ✓ GitHub account

---

## 🎯 STEP 1: Create GitHub Repository (3 minutes)

### 1.1 Create Repository on GitHub

```bash
# Go to: https://github.com/new
# Or use GitHub CLI:
gh repo create secure-todo-app --public --clone
cd secure-todo-app
```

**Settings:**
- Name: `secure-todo-app`
- Description: Secure Todo Application with CI/CD Pipeline
- Visibility: Public
- Initialize with README: ✓

### 1.2 Clone and Add Files

```bash
git clone https://github.com/YOUR-USERNAME/secure-todo-app.git
cd secure-todo-app

# Copy all files from this guide:
# - Jenkinsfile
# - Dockerfile
# - docker-compose.yml
# - package.json
# - server.js
# - .gitignore
# - .env.example
```

### 1.3 Push to GitHub

```bash
git add .
git commit -m "feat: Add CI/CD pipeline with Jenkins, Docker, and deployment automation"
git push origin main
```

**Verify:** https://github.com/YOUR-USERNAME/secure-todo-app

---

## 🔐 STEP 2: GitHub Token & Credentials (5 minutes)

### 2.1 Generate GitHub Personal Access Token

```bash
# Go to: https://github.com/settings/tokens
# Click: "Generate new token (classic)"

# Token Settings:
- Token name: jenkins-deployment
- Expiration: 90 days
- Scopes: Check THESE
  ✓ repo (Full control of private repositories)
  ✓ admin:repo_hook (Full control of repository hooks)
  ✓ read:user (Read user profile data)
  ✓ workflow (Update GitHub Action workflows)

# Copy the token (40 character string)
# SAVE IT - you can't see it again!
```

### 2.2 Add GitHub Credentials to Jenkins

```
Jenkins Dashboard → Manage Jenkins → Manage Credentials
```

**Steps:**
1. Click **Jenkins** (global store)
2. Click **Add Credentials**
3. Fill in:
   - **Kind**: Username with password
   - **Username**: YOUR-GITHUB-USERNAME
   - **Password**: PASTE-THE-TOKEN-HERE
   - **ID**: github-credentials
   - **Description**: GitHub Jenkins Deployment Token
4. Click **Create**

---

## 🪝 STEP 3: GitHub Webhook Configuration (3 minutes)

### 3.1 Add Webhook to GitHub Repository

```
GitHub Repository → Settings → Webhooks → Add webhook
```

**Fill in:**
- **Payload URL**: `http://localhost:8080/github-webhook/`
  - For remote server: `http://YOUR-JENKINS-IP:8080/github-webhook/`
- **Content type**: `application/json`
- **Events**: 
  - ✓ Push events
  - ✓ Pull requests
  - ✓ Releases
- **Active**: ✓ Checked

**Click:** Add webhook

### 3.2 Verify Webhook

```
GitHub → Webhooks → Click the webhook → Recent Deliveries
```

Should show green ✓ indicators for successful deliveries.

---

## 🏢 STEP 4: Create Jenkins Pipeline Job (5 minutes)

### 4.1 Log in to Jenkins

```
http://localhost:8080
Username: admin
Password: 48f12177089c44068fc0253254f38401
```

### 4.2 Create New Job

```
Jenkins Dashboard → New Item
```

**Settings:**
- **Item name**: `secure-todo-app-pipeline`
- **Type**: Select **Pipeline**
- Click **OK**

### 4.3 Configure Job - General Tab

```
✓ Discard old builds
  - Max # of builds to keep: 15
  - Max # of builds to keep with artifacts: 5

✓ GitHub project
  - Project url: https://github.com/YOUR-USERNAME/secure-todo-app/
```

### 4.4 Configure Job - Build Triggers Tab

```
✓ GitHub hook trigger for GITScm polling
```

This enables automatic builds when you push to GitHub.

### 4.5 Configure Job - Pipeline Tab

**Definition:** Select **Pipeline script from SCM**

```
- SCM: Git
  
  - Repository URL: 
    https://github.com/YOUR-USERNAME/secure-todo-app.git
  
  - Credentials: 
    Select "github-credentials" (created earlier)
  
  - Branches to build: 
    */main
  
  - Script Path: 
    Jenkinsfile (default)
```

### 4.6 Save Job

Click **Save**

---

## 🧪 STEP 5: Test the Pipeline (5 minutes)

### 5.1 Manual Build Test

```
Jenkins Dashboard → secure-todo-app-pipeline → Build with Parameters
```

**Select:**
- **ENVIRONMENT**: staging
- **ACTION**: build_and_deploy
- **SEND_NOTIFICATIONS**: ✓ Checked
- **SKIP_TESTS**: (leave unchecked)

Click **Build**

### 5.2 Monitor Build

```
Jenkins → secure-todo-app-pipeline → #1 (build number)
Click "Console Output" to watch live logs
```

### 5.3 Check Email Notification

```
Gmail → Inbox → securetodolist1@gmail.com
Look for email subject: "✅ BUILD SUCCESS: secure-todo-app-pipeline #1"
```

**Email should contain:**
- Build status (✓ SUCCESS)
- Environment (staging)
- Build duration
- Docker image name
- Links to build details

---

## 🔄 STEP 6: Test GitHub Push Trigger (Automatic)

### 6.1 Make a Code Change

```bash
cd secure-todo-app

# Edit any file (example: README.md)
echo "## Deployment successful!" >> README.md

# Commit and push
git add .
git commit -m "test: Trigger Jenkins pipeline via GitHub webhook"
git push origin main
```

### 6.2 Jenkins Auto-Triggers

```
Jenkins Dashboard → secure-todo-app-pipeline
Should see new build: #2 (or higher)
```

Jenkins automatically detected GitHub push and started the build!

### 6.3 Verify Deployment

**Staging Environment:**
```bash
# Check if container is running
docker ps | grep staging

# Test the endpoint
curl http://localhost:3001/health
curl http://localhost:3001/api/version

# View logs
docker logs secure-todo-app-staging
```

**Expected output:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "environment": "staging",
  "uptime": 123.45
}
```

---

## 🌐 STEP 7: Production Deployment (Manual with Approval)

### 7.1 Trigger Production Build

```
Jenkins Dashboard → secure-todo-app-pipeline → Build with Parameters
```

**Select:**
- **ENVIRONMENT**: production
- **ACTION**: build_and_deploy
- **SEND_NOTIFICATIONS**: ✓ Checked

Click **Build**

### 7.2 Approval Required

Jenkins will ask for approval:
```
⚠️ PRODUCTION DEPLOYMENT
Production: Approve?
```

**Only users in 'admin,developers' group can approve**

Click **Yes, Deploy to Production**

### 7.3 Production Goes Live

```bash
# Test production endpoint
curl http://localhost:3000/health
curl http://localhost:3000/api/todos

# View production logs
docker logs secure-todo-app-prod
```

### 7.4 Email Confirmation

Email received at securetodolist1@gmail.com with:
- ✓ Production deployment successful
- Production endpoint: http://localhost:3000
- Build details and approval info

---

## 🔄 STEP 8: Rollback (If Needed)

### 8.1 Trigger Rollback

```
Jenkins Dashboard → secure-todo-app-pipeline → Build with Parameters
```

**Select:**
- **ENVIRONMENT**: production
- **ACTION**: rollback
- **SEND_NOTIFICATIONS**: ✓ Checked

Click **Build**

### 8.2 Approval

Confirm rollback operation. Jenkins will:
1. Stop current production container
2. Restore previous backup
3. Start restored version
4. Verify health checks
5. Send notification

---

## 📊 Pipeline Stages Explained

| Stage | Purpose | Runs When |
|-------|---------|-----------|
| **Initialization** | Display build info | Always |
| **Checkout** | Clone GitHub repo | Always |
| **Code Analysis** | Check syntax | Always |
| **Install Dependencies** | npm install | On build/build_and_deploy |
| **Run Tests** | Execute tests | On build (unless skipped) |
| **Build Application** | npm run build | On build/build_and_deploy |
| **Build Docker Image** | Create image | On build/build_and_deploy |
| **Security Scan** | Check image | On build/build_and_deploy |
| **Deploy to Staging** | Deploy port 3001 | On deploy (staging) |
| **Deploy to Production** | Deploy port 3000 | On deploy (prod) + approval |
| **Verification** | Health checks | On deploy/build_and_deploy |
| **Rollback** | Restore backup | On rollback action |

---

## 📧 Email Notifications

### Success Email Contains:
- ✅ Build status (SUCCESS)
- Job name and build number
- Environment (staging/production)
- Git commit hash
- Build duration
- Docker image details
- Deployment endpoints
- Links to view full details

### Failure Email Contains:
- ❌ Build status (FAILED)
- Failed stage name
- Error troubleshooting steps
- Link to console output
- Link to build summary

### Unstable Email Contains:
- ⚠️ Build warnings
- Test failure details
- Link to console

---

## 🔒 Email Configuration Verification

### Verify SMTP in Jenkins

```
Jenkins → Manage Jenkins → Configure System
Scroll to: Email Notification
```

**Should show:**
- SMTP server: smtp.gmail.com
- SMTP Port: 587
- User Name: securetodolist1@gmail.com
- Use TLS: ✓ Checked

### Send Test Email

```
Click: "Test configuration by sending test e-mail"
Enter: securetodolist1@gmail.com
Click: Test
```

Should see: "Email was successfully sent"

---

## 🐳 Docker & Application

### Available Endpoints

**Staging (Port 3001):**
- Health: `http://localhost:3001/health`
- Ready: `http://localhost:3001/ready`
- Version: `http://localhost:3001/api/version`
- Todos: `http://localhost:3001/api/todos`

**Production (Port 3000):**
- Health: `http://localhost:3000/health`
- Ready: `http://localhost:3000/ready`
- Version: `http://localhost:3000/api/version`
- Todos: `http://localhost:3000/api/todos`

### Container Management

```bash
# View running containers
docker ps | grep secure-todo-app

# View container logs
docker logs secure-todo-app-staging
docker logs secure-todo-app-prod

# Stop container
docker stop secure-todo-app-prod

# Restart container
docker restart secure-todo-app-prod

# View container stats
docker stats secure-todo-app-prod
```

---

## 📋 Complete Deployment Checklist

### Pre-Deployment
- [ ] GitHub repository created
- [ ] Jenkinsfile added to repo
- [ ] All files pushed to main branch
- [ ] GitHub token generated
- [ ] Jenkins credentials added
- [ ] GitHub webhook configured
- [ ] Webhook deliveries showing success

### Jenkins Job Setup
- [ ] New pipeline job created
- [ ] GitHub project URL configured
- [ ] Build triggers enabled
- [ ] SCM configured with correct credentials
- [ ] Pipeline script path set to Jenkinsfile

### Testing
- [ ] First manual build triggered successfully
- [ ] Build completed without errors
- [ ] Staging deployment verified
- [ ] Health endpoints responding
- [ ] Email notifications received

### Production Ready
- [ ] Staging tested thoroughly
- [ ] All endpoints verified working
- [ ] Email notifications configured
- [ ] Backup strategy in place
- [ ] Rollback procedure tested
- [ ] Team trained on deployment process

---

## 🚨 Troubleshooting

### Jenkins Build Not Starting
```
1. Check GitHub webhook status:
   GitHub → Webhooks → Recent Deliveries
   
2. Verify Jenkins URL is accessible:
   curl http://your-jenkins-ip:8080/github-webhook/
   
3. Restart Jenkins if needed:
   docker restart jenkins-server
```

### Email Not Sending
```
1. Test SMTP manually:
   Jenkins → Configure System → Email Notification → Test
   
2. Check Jenkins logs:
   docker logs jenkins-server | grep -i mail
   
3. Verify Gmail app password (16 chars, no spaces)
```

### Docker Build Fails
```
1. Check Docker is running:
   docker ps
   
2. Check Dockerfile syntax:
   docker build --help
   
3. View build logs:
   docker build -t test . 2>&1 | tail -50
```

### Production Deployment Blocked
```
1. Check approval settings:
   Jenkins Job → Configure → Pipeline → input
   
2. Verify user permissions:
   Jenkins → Manage Users → Check admin group
```

---

## 📞 Support & References

- **Jenkins**: http://localhost:8080
- **GitHub**: https://github.com/YOUR-USERNAME/secure-todo-app
- **Gmail**: securetodolist1@gmail.com
- **Docker Docs**: https://docs.docker.com/
- **Jenkins Docs**: https://www.jenkins.io/doc/

---

## 🎉 You're Ready to Deploy!

All systems configured:
- ✅ GitHub repository with webhook
- ✅ Jenkins pipeline with CI/CD
- ✅ Docker containerization
- ✅ Automated email notifications
- ✅ Staging and production environments
- ✅ Approval workflow for production
- ✅ Rollback capability

**Next Step:** Push code and watch it deploy automatically! 🚀
