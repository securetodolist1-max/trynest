# 🚀 Desktop GitHub + Jenkins + Gmail CI/CD Setup
## Complete Ready-to-Deploy Guide

---

## ✅ Prerequisites

- ✓ Jenkins running: http://localhost:8080
- ✓ Docker installed
- ✓ Git installed on desktop
- ✓ GitHub account
- ✓ Text editor (VS Code recommended)

---

## STEP 1: Create GitHub Repository (5 minutes)

### 1.1 Create on GitHub Web

Go to: **https://github.com/new**

Fill in:
- **Repository name**: `secure-todo-app`
- **Description**: Secure Todo Application with CI/CD Pipeline
- **Visibility**: Public
- **Initialize with README**: ✓
- **Add .gitignore**: Select "Node"

Click **Create repository**

✅ Repository created!

### 1.2 Clone to Desktop

Open terminal and run:

```bash
git clone https://github.com/YOUR-USERNAME/secure-todo-app.git
cd secure-todo-app
```

✅ Repository cloned locally!

---

## STEP 2: Add Project Files (5 minutes)

### 2.1 Copy All Files to Project Folder

Copy these files to your `secure-todo-app` folder:

1. **Jenkinsfile** (from guide)
2. **Dockerfile** (from guide)
3. **docker-compose.yml** (from guide)
4. **package.json** (from guide)
5. **server.js** (from guide)
6. **.gitignore** (already exists)
7. **.env.example** (from guide)

### 2.2 Push to GitHub

```bash
git add .
git commit -m "feat: Add CI/CD pipeline with Jenkinsfile, Docker, and deployment config"
git push origin main
```

✅ All files on GitHub!

---

## STEP 3: Generate GitHub Token (3 minutes)

### 3.1 Create Personal Access Token

Go to: **https://github.com/settings/tokens**

Click **Generate new token (classic)**

Fill in:
- **Token name**: `jenkins-deployment`
- **Expiration**: 90 days
- **Scopes**: Check these:
  - ✓ repo
  - ✓ admin:repo_hook
  - ✓ read:user

Click **Generate token**

✅ **COPY the token and save it somewhere safe!**

---

## STEP 4: Setup Jenkins Credentials (3 minutes)

### 4.1 Open Jenkins Dashboard

Go to: **http://localhost:8080**

Login with:
- **Username**: admin
- **Password**: 48f12177089c44068fc0253254f38401

### 4.2 Add GitHub Credentials

Click **Manage Jenkins** → **Manage Credentials**

Click **Jenkins** (global store)

Click **Add Credentials**

Fill in:
- **Kind**: Username with password
- **Username**: YOUR-GITHUB-USERNAME
- **Password**: PASTE-YOUR-TOKEN-HERE
- **ID**: `github-credentials`
- **Description**: GitHub Jenkins Token

Click **Create**

✅ Credentials saved!

---

## STEP 5: Add GitHub Webhook (3 minutes)

### 5.1 Go to Repository Settings

Go to: **https://github.com/YOUR-USERNAME/secure-todo-app**

Click **Settings** (gear icon) → **Webhooks** → **Add webhook**

### 5.2 Configure Webhook

Fill in:
- **Payload URL**: `http://localhost:8080/github-webhook/`
  - For remote server: `http://YOUR-IP:8080/github-webhook/`
- **Content type**: `application/json`
- **Events**: 
  - ✓ Push events
  - ✓ Pull requests
  - ✓ Releases
- **Active**: ✓ Checked

Click **Add webhook**

✅ Webhook created!

### 5.3 Verify Webhook

In the webhook settings, click **Recent Deliveries**

Should show green ✓ indicators for successful requests.

---

## STEP 6: Create Jenkins Pipeline Job (5 minutes)

### 6.1 Create New Job

Go to: **http://localhost:8080**

Click **New Item**

Fill in:
- **Item name**: `secure-todo-app-pipeline`
- **Type**: Select **Pipeline**

Click **OK**

### 6.2 Configure - General Tab

✓ Check: **Discard old builds**
  - Max # of builds to keep: `15`

✓ Check: **GitHub project**
  - Project url: `https://github.com/YOUR-USERNAME/secure-todo-app/`

### 6.3 Configure - Build Triggers Tab

✓ Check: **GitHub hook trigger for GITScm polling**

This enables automatic builds when you push to GitHub!

### 6.4 Configure - Pipeline Tab

**Definition**: Select **Pipeline script from SCM**

- **SCM**: Git
  - **Repository URL**: `https://github.com/YOUR-USERNAME/secure-todo-app.git`
  - **Credentials**: Select `github-credentials` (created earlier)
  - **Branches to build**: `*/main`
  - **Script Path**: `Jenkinsfile` (default)

Click **Save**

✅ Jenkins job created!

---

## STEP 7: Test the Pipeline (5 minutes)

### 7.1 Make a Test Commit

In your terminal:

```bash
# Make a small change
echo "# Updated: Ready for deployment" >> README.md

# Commit and push
git add README.md
git commit -m "test: Trigger Jenkins pipeline"
git push origin main
```

### 7.2 Watch Jenkins Auto-Build

Go to: **http://localhost:8080**

Click **secure-todo-app-pipeline**

You should see **Build #1** start automatically!

Watch the build progress in real-time.

### 7.3 Check Email Notification

Check email: **securetodolist1@gmail.com**

Should receive email with build status!

✅ Pipeline working!

---

## 🚀 Daily Development Workflow

### Scenario 1: Fix a Bug

```bash
# 1. Edit code locally
nano server.js
# Make your fix

# 2. Commit and push
git add server.js
git commit -m "fix: Resolve authentication issue"
git push origin main

# 3. Jenkins automatically:
#    - Pulls your code
#    - Builds Docker image
#    - Runs tests
#    - Deploys to staging
#    - Sends email notification

# 4. Check status:
#    Email OR Jenkins dashboard
```

### Scenario 2: Add New Feature

```bash
# 1. Create feature branch
git checkout -b feature/new-dashboard

# 2. Edit files
nano server.js
# Add your feature

# 3. Commit to feature branch
git add server.js
git commit -m "feat: Add new dashboard page"
git push origin feature/new-dashboard

# 4. Create Pull Request on GitHub
#    Jenkins will test the PR
#    Green checkmark = Safe to merge

# 5. Merge to main
#    Jenkins automatically deploys to production
```

### Scenario 3: Manual Production Deployment

```bash
# 1. Make sure main branch is ready
git push origin main

# 2. Go to Jenkins
#    http://localhost:8080

# 3. Click: secure-todo-app-pipeline → Build with Parameters
#    Select:
#    - ENVIRONMENT: production
#    - ACTION: build_and_deploy
#    - SEND_NOTIFICATIONS: checked

# 4. Click: Build

# 5. Jenkins will ask for approval to deploy to production
#    (This is a safety feature)

# 6. Approve in Jenkins

# 7. App deployed to production!
#    Check: http://localhost:3000
```

---

## 📊 Complete Development Flow

```
Local Development
    ↓
git commit -m "feature description"
    ↓
git push origin main
    ↓
GitHub Webhook
    ↓
Jenkins Triggered
    ↓
├─ Checkout code
├─ Install dependencies
├─ Run tests
├─ Build Docker image
├─ Deploy to staging (port 3001)
└─ Send email notification
    ↓
Check Email: securetodolist1@gmail.com
    ↓
Verify Staging: http://localhost:3001
    ↓
Manual Approval for Production
    ↓
Production Deployment (port 3000)
    ↓
✅ Live!
```

---

## 🔄 Git Commands You'll Use

### First Time Setup

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/secure-todo-app.git
cd secure-todo-app

# Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your-email@gmail.com"
```

### Daily Work

```bash
# See what changed
git status

# Stage changes
git add .

# Or stage specific file
git add server.js

# Commit
git commit -m "Descriptive commit message"

# Push to GitHub (triggers Jenkins)
git push origin main
```

### Feature Branches

```bash
# Create new branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: Add my feature"

# Push branch
git push origin feature/my-feature

# Create Pull Request on GitHub
# Then merge when tests pass
```

### Update from GitHub

```bash
# Pull latest changes
git pull origin main
```

---

## 📧 Email Notifications

After each push, you'll receive an email at **securetodolist1@gmail.com**

### Success Email Example:

```
Subject: ✅ BUILD SUCCESS: secure-todo-app-pipeline #1

Job Name: secure-todo-app-pipeline
Build Number: #1
Status: SUCCESS
Environment: staging
Build Duration: 2 min 15 sec
Git Commit: abc1234
Docker Image: secure-todo-app:1

Endpoints:
- Staging: http://localhost:3001/health
- Production: http://localhost:3000/health

View Details: [link to Jenkins]
```

### Failure Email Example:

```
Subject: ❌ BUILD FAILED: secure-todo-app-pipeline #2

Job Name: secure-todo-app-pipeline
Build Number: #2
Status: FAILED
Failed Stage: Run Tests
Git Commit: def5678

Error Details:
Test failed: Unable to connect to database

Fix: Check database connection string
View Logs: [link to console output]
```

---

## 🐳 Test Deployed App

### After Staging Build:

```bash
# Test staging endpoint
curl http://localhost:3001/health
curl http://localhost:3001/api/version
curl http://localhost:3001/api/todos

# Should see JSON response with status "healthy"
```

### After Production Build:

```bash
# Test production endpoint
curl http://localhost:3000/health
curl http://localhost:3000/api/version
curl http://localhost:3000/api/todos
```

### View Logs:

```bash
# Staging logs
docker logs secure-todo-app-staging

# Production logs
docker logs secure-todo-app-prod
```

---

## 📋 Complete Setup Checklist

- [ ] GitHub repository created
- [ ] Project cloned locally
- [ ] All files added to repository
- [ ] Files pushed to GitHub
- [ ] GitHub token generated
- [ ] Jenkins credentials added
- [ ] GitHub webhook configured
- [ ] Webhook verified (green checkmarks)
- [ ] Jenkins job created
- [ ] First test push completed
- [ ] Build triggered automatically
- [ ] Email notification received
- [ ] Staging app accessible (port 3001)
- [ ] Ready for production

---

## 🎯 Common Tasks

### Deploy to Staging

```bash
# 1. Make changes locally
# 2. Git push
# 3. Jenkins automatically deploys to staging
# 4. Check: http://localhost:3001
# 5. Email notification sent
```

### Deploy to Production

```bash
# Option A: Approve in Jenkins UI
Jenkins → secure-todo-app-pipeline → Build #X
Click "Proceed" when prompted

# Option B: Use Jenkins API
curl -X POST http://localhost:8080/job/secure-todo-app-pipeline/[BUILD_ID]/input/ProceedAction/proceed

# Result: App deployed to http://localhost:3000
```

### Rollback

```bash
# Using Jenkins
Jenkins → secure-todo-app-pipeline → Build with Parameters
Select ACTION: rollback
Click Build

# Jenkins restores previous version
```

### View Build Status

```bash
# Option A: Email
Check securetodolist1@gmail.com

# Option B: Jenkins Dashboard
http://localhost:8080
Click job name to see build history

# Option C: GitHub
GitHub → Repository → View commit status
Shows Jenkins build status
```

---

## 🔍 Troubleshooting

### Build Not Starting

```
Check 1: GitHub webhook status
- GitHub → Settings → Webhooks
- Click webhook → Recent Deliveries
- Should show green ✓

Check 2: Jenkins URL accessible
- Ensure http://localhost:8080 is reachable from GitHub

Check 3: Jenkins credentials
- Verify github-credentials are correct
```

### Email Not Arriving

```
Check 1: Test SMTP manually
- Jenkins → Configure System
- Email Notification → Test configuration
- Enter: securetodolist1@gmail.com
- Should see "Email sent successfully"

Check 2: Check spam folder
- Email might be in spam/junk

Check 3: Verify email settings
- SMTP: smtp.gmail.com
- Port: 587
- TLS: Enabled
- Username: securetodolist1@gmail.com
```

### Docker Container Not Running

```
Check 1: Docker status
docker ps | grep secure-todo-app

Check 2: Docker logs
docker logs secure-todo-app-staging
docker logs secure-todo-app-prod

Check 3: Restart containers
docker-compose restart
```

### Build Fails

```
Check 1: Jenkins console output
- Jenkins → Build # → Console Output

Check 2: Check error message
- Scroll to bottom for error details

Check 3: Common fixes
- Check dependencies installed
- Check Dockerfile syntax
- Check file permissions
- Restart Jenkins: docker restart jenkins-server
```

---

## 🚀 Launch Checklist

Before you start deploying:

- [ ] Jenkins running
- [ ] GitHub repository created
- [ ] Local git repo cloned
- [ ] GitHub token created
- [ ] Jenkins credentials added
- [ ] Webhook configured
- [ ] Jenkins job created
- [ ] Test commit pushed
- [ ] Email notification received
- [ ] Staging app working
- [ ] Ready to deploy!

---

## 💡 Pro Tips

### Tip 1: Meaningful Commit Messages
```
Good:
- "fix: Resolve login validation bug"
- "feat: Add password reset functionality"
- "docs: Update API documentation"

Bad:
- "fix"
- "update"
- "asdf"

Jenkins shows commit message in emails!
```

### Tip 2: Use Feature Branches
```bash
# Create feature branch
git checkout -b feature/my-feature

# Jenkins tests PR automatically
# Merge only after tests pass
```

### Tip 3: Check Status Before Production
```
1. Push to main
2. Wait for Jenkins staging build
3. Test staging app
4. Then approve production deployment
```

### Tip 4: Monitor Logs Regularly
```bash
# Watch real-time logs
docker logs -f secure-todo-app-staging

# Check container health
docker ps | grep secure-todo-app
```

---

## 📞 Support

**Jenkins Dashboard**: http://localhost:8080

**GitHub Repository**: https://github.com/YOUR-USERNAME/secure-todo-app

**Email Notifications**: securetodolist1@gmail.com

**Docker Commands**: `docker ps`, `docker logs`

**Git Commands**: `git status`, `git push`

---

## 🎉 You're Ready!

Complete desktop GitHub + Jenkins setup:
- ✅ GitHub repository with webhook
- ✅ Jenkins pipeline with auto-trigger
- ✅ Docker containerization
- ✅ Automated email notifications
- ✅ Staging environment (port 3001)
- ✅ Production environment (port 3000)
- ✅ Approval workflow
- ✅ Rollback capability

**Start deploying!** 🚀

```bash
# 1. Make code changes
# 2. git commit
# 3. git push
# 4. Jenkins automatically deploys
# 5. Check email for status
# 6. App live!
```
