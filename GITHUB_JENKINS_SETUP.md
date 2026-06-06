# GitHub & Jenkins CI/CD Setup Guide

## Part 1: Create GitHub Repository

### Step 1: Create Repository on GitHub
1. Go to **https://github.com/new**
2. **Repository name**: `secure-todo-app`
3. **Description**: Secure Todo Application with CI/CD
4. Select **Public** or **Private**
5. Check ✓ **Add a README file**
6. Click **Create repository**

### Step 2: Clone Repository Locally
```bash
git clone https://github.com/YOUR-USERNAME/secure-todo-app.git
cd secure-todo-app
```

### Step 3: Add Files to Repository
Copy these files to your repository root:
- `Jenkinsfile` — Pipeline configuration
- `Dockerfile` — Container configuration
- `docker-compose.yml` — Multi-environment deployment
- `.gitignore` — Ignore node_modules, .env, etc.
- `package.json` — Node.js dependencies
- Application source code

### Step 4: Push to GitHub
```bash
git add .
git commit -m "Initial commit: Add Jenkins pipeline, Docker, and deployment config"
git push origin main
```

---

## Part 2: GitHub Webhook Configuration

### Step 1: Generate GitHub Personal Access Token
1. Go to **https://github.com/settings/tokens**
2. Click **Generate new token (classic)**
3. **Token name**: `jenkins-deployment`
4. **Expiration**: 90 days (or No expiration)
5. **Scopes**: Check ✓
   - `repo` (Full control of private repositories)
   - `admin:repo_hook` (Full control of repository hooks)
   - `read:user` (Read user profile data)
6. Click **Generate token**
7. **Copy the token** (you won't see it again!)

### Step 2: Add GitHub Credentials to Jenkins
1. Open **http://localhost:8080**
2. Click **Manage Jenkins** → **Manage Credentials**
3. Click **Jenkins** (global store)
4. Click **Add Credentials**
   - **Kind**: **Username with password**
   - **Username**: Your GitHub username
   - **Password**: Paste the token you just created
   - **ID**: `github-credentials`
   - **Description**: GitHub Deployment Token
5. Click **Create**

### Step 3: Add Webhook to GitHub Repository
1. Go to your GitHub repository
2. Click **Settings** → **Webhooks**
3. Click **Add webhook**
4. **Payload URL**: `http://your-jenkins-ip:8080/github-webhook/`
   - Replace `your-jenkins-ip` with your actual IP or domain
   - For local testing: `http://localhost:8080/github-webhook/`
5. **Content type**: `application/json`
6. **Events**: Select events to trigger builds
   - ✓ **Push events** (Build on every push)
   - ✓ **Pull request events** (Build on PR)
   - (Optional) ✓ **Release events**
7. **Active**: Check ✓
8. Click **Add webhook**

### Step 4: Verify Webhook
1. In GitHub, go to **Webhooks** settings
2. Click on the webhook you just created
3. Click **Recent Deliveries**
4. You should see successful requests (green checkmarks)

---

## Part 3: Create Jenkins Pipeline Job

### Step 1: Create New Job in Jenkins
1. Open **http://localhost:8080**
2. Click **New Item** (top left)
3. **Enter job name**: `secure-todo-app-pipeline`
4. Select **Pipeline**
5. Click **OK**

### Step 2: Configure General Settings
- ✓ **Discard old builds**
  - Max # of builds to keep: `10`
- ✓ **GitHub project**
  - Project url: `https://github.com/YOUR-USERNAME/secure-todo-app/`

### Step 3: Configure Build Triggers
- ✓ **GitHub hook trigger for GITScm polling**
  (This enables webhook-based triggering)

### Step 4: Configure Pipeline
**Definition**: Select **Pipeline script from SCM**

- **SCM**: **Git**
  - **Repository URL**: `https://github.com/YOUR-USERNAME/secure-todo-app.git`
  - **Credentials**: Select `github-credentials` (created earlier)
  - **Branches to build**: `*/main` (or your branch name)
  - **Script Path**: `Jenkinsfile` (default)

### Step 5: Save
Click **Save**

---

## Part 4: Email Notifications Verification

### Verify SMTP Configuration
1. Click **Manage Jenkins** → **Configure System**
2. Scroll to **Email Notification**
3. Verify these settings:
   - **SMTP server**: `smtp.gmail.com`
   - **SMTP Port**: `587`
   - **Use TLS**: ✓ Checked
   - **User Name**: `securetodolist1@gmail.com`
   - **Password**: `sweq wftk gzey molk`

### Send Test Email
- Click **Test configuration**
- Enter: `securetodolist1@gmail.com`
- Click **Test**
- Check email for test message

---

## Part 5: Trigger Your First Build

### Method 1: Manual Trigger (Quick Test)
1. Open **http://localhost:8080**
2. Click on your job: `secure-todo-app-pipeline`
3. Click **Build with Parameters**
4. Select options:
   - **ENVIRONMENT**: `staging`
   - **ACTION**: `build_and_deploy`
   - **NOTIFY_TEAM**: ✓ Checked
5. Click **Build**
6. Watch the build progress
7. Check email for notifications

### Method 2: GitHub Push (Automatic)
1. Make a change to your repository locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test webhook trigger"
   git push origin main
   ```
3. Jenkins will automatically trigger the build
4. Check Jenkins dashboard and email

---

## Part 6: Pipeline Stages Explained

### Stage Breakdown

| Stage | Purpose | Condition |
|-------|---------|-----------|
| **Initialization** | Display build info | Always runs |
| **Checkout** | Get code from GitHub | Always runs |
| **Code Quality Analysis** | Check syntax | Always runs |
| **Install Dependencies** | npm/pip install | On build/build_and_deploy |
| **Run Tests** | Execute test suite | On build/build_and_deploy |
| **Build Application** | npm run build | On build/build_and_deploy |
| **Build Docker Image** | Create Docker image | On build/build_and_deploy |
| **Scan Docker Image** | Security scan | On build/build_and_deploy |
| **Push to Registry** | Upload to Docker Hub | On build/build_and_deploy |
| **Deploy to Staging** | Deploy to staging env | On deploy (staging) |
| **Deploy to Production** | Deploy to prod env | On deploy (production) + approval |
| **Post Deployment** | Verify deployment | On deploy/build_and_deploy |

---

## Part 7: Environment Variables in Pipeline

The pipeline uses these environment variables:

```groovy
APP_NAME = 'secure-todo-app'
BUILD_NUMBER = Build number
GIT_COMMIT_SHORT = Short commit hash
DOCKER_REGISTRY = 'docker.io'
DOCKER_IMAGE = Full image path
DOCKER_TAG = Build number
NODE_ENV = 'production'
ENVIRONMENT = Parameter (staging/production)
ACTION = Parameter (build/deploy/build_and_deploy)
```

Use in your code:
```bash
echo "App: ${APP_NAME}"
echo "Build: ${BUILD_NUMBER}"
```

---

## Part 8: Troubleshooting

### Build Not Triggering from GitHub?
1. Check webhook status:
   - GitHub → Repository → Settings → Webhooks
   - Look for recent deliveries
   - Check for red X marks (failures)

2. Verify Jenkins URL:
   - Ensure Jenkins is accessible from GitHub
   - Use public IP or domain, not localhost
   - Check firewall rules

3. Restart Jenkins:
   ```bash
   docker restart jenkins-server
   ```

### Email Notifications Not Sending?
1. Check Jenkins logs:
   ```bash
   docker logs jenkins-server | grep -i mail
   ```

2. Test email manually:
   - Configure System → Email Notification → Test configuration

3. Verify credentials:
   - Gmail app password is 16 characters
   - Check it has no extra spaces
   - Ensure 2-Step Verification is enabled

### GitHub Credentials Error?
1. Verify GitHub token hasn't expired
2. Token should have `repo` and `admin:repo_hook` scopes
3. Generate new token if needed

---

## Part 9: Complete CI/CD Flow

```
Developer Push Code
        ↓
GitHub Webhook Triggered
        ↓
Jenkins Receives Webhook
        ↓
Jenkins Pipeline Starts
        ↓
Checkout Code from GitHub
        ↓
Run Tests
        ↓
Build Application
        ↓
Build Docker Image
        ↓
Deploy to Staging/Production
        ↓
Send Email Notification
        ↓
Deployment Complete
```

---

## Part 10: Production Deployment Checklist

Before deploying to production:

- ✓ All tests pass
- ✓ Code review completed
- ✓ Security scan passed
- ✓ Docker image built successfully
- ✓ Staging deployment verified
- ✓ Approval received
- ✓ Backup created
- ✓ Rollback plan in place
- ✓ Monitoring configured
- ✓ Email notifications enabled

---

## Summary

✓ GitHub repository created
✓ Jenkinsfile added to repository
✓ GitHub webhook configured
✓ Jenkins credentials added
✓ Jenkins job created
✓ Email notifications configured
✓ Pipeline ready for deployment

**Your CI/CD pipeline is now ready to use!**

Next step: Push code and watch it deploy automatically!
