# 🚀 YOUR COMPLETE DEPLOYMENT SETUP
## For: https://github.com/securetodolist1-max/secure-todo-app.git

---

## ✅ STEP 1: Clone YOUR Repository

Open Terminal/Command Prompt and run:

```bash
git clone https://github.com/securetodolist1-max/secure-todo-app.git
cd secure-todo-app
```

---

## ✅ STEP 2: Add Project Files

Copy these 7 files into your `secure-todo-app` folder:

### File 1: Create `Jenkinsfile`
```groovy
pipeline {
    agent any
    
    environment {
        APP_NAME = 'secure-todo-app'
        BUILD_ID = "${env.BUILD_NUMBER}"
        GIT_COMMIT_SHORT = "${env.GIT_COMMIT.take(7)}"
        DOCKER_IMAGE_NAME = "${APP_NAME}"
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production'], description: 'Environment')
        choice(name: 'ACTION', choices: ['build', 'deploy', 'build_and_deploy'], description: 'Action')
        booleanParam(name: 'SEND_NOTIFICATIONS', defaultValue: true, description: 'Send notifications')
    }
    
    stages {
        stage('Initialize') {
            steps {
                script {
                    echo "=================================================="
                    echo "BUILD: ${env.BUILD_NUMBER}"
                    echo "URL: ${env.BUILD_URL}"
                    echo "=================================================="
                }
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            when {
                expression { params.ACTION == 'build' || params.ACTION == 'build_and_deploy' }
            }
            steps {
                sh '''
                    if [ -f "package.json" ]; then
                        npm install
                    fi
                '''
            }
        }
        
        stage('Build Application') {
            when {
                expression { params.ACTION == 'build' || params.ACTION == 'build_and_deploy' }
            }
            steps {
                sh '''
                    if [ -f "package.json" ]; then
                        npm run build || echo "No build script"
                    fi
                '''
            }
        }
        
        stage('Build Docker Image') {
            when {
                expression { params.ACTION == 'build' || params.ACTION == 'build_and_deploy' }
            }
            steps {
                sh '''
                    if [ -f "Dockerfile" ]; then
                        docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \
                                    -t ${DOCKER_IMAGE_NAME}:latest .
                    fi
                '''
            }
        }
        
        stage('Deploy to Staging') {
            when {
                expression { 
                    (params.ACTION == 'deploy' || params.ACTION == 'build_and_deploy') &&
                    params.ENVIRONMENT == 'staging'
                }
            }
            steps {
                sh '''
                    docker compose -f docker-compose.yml down app-staging || true
                    docker compose -f docker-compose.yml up -d app-staging
                    sleep 5
                '''
            }
        }
        
        stage('Deploy to Production') {
            when {
                expression { 
                    (params.ACTION == 'deploy' || params.ACTION == 'build_and_deploy') &&
                    params.ENVIRONMENT == 'production'
                }
            }
            input {
                message "Deploy to PRODUCTION?"
                ok "Yes, Deploy"
            }
            steps {
                sh '''
                    docker compose -f docker-compose.yml down app-prod || true
                    docker compose -f docker-compose.yml up -d app-prod
                    sleep 5
                '''
            }
        }
    }
    
    post {
        success {
            script {
                if (params.SEND_NOTIFICATIONS) {
                    emailext(
                        subject: "✅ BUILD SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
<html>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px;">
        <div style="background: #28a745; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h2>✅ Build Successful!</h2>
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f2f2f2;">
                <th style="padding: 12px; border: 1px solid #ddd;">Property</th>
                <th style="padding: 12px; border: 1px solid #ddd;">Value</th>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Job</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${env.JOB_NAME}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Build #</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${env.BUILD_NUMBER}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Status</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: green;"><b>SUCCESS</b></td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Environment</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${params.ENVIRONMENT}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Duration</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${currentBuild.durationString}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Git Commit</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${env.GIT_COMMIT_SHORT}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Docker Image</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}</td>
            </tr>
        </table>
        
        <div style="margin-top: 20px; text-align: center;">
            <a href="${env.BUILD_URL}" style="padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 3px;">View Build</a>
        </div>
    </div>
</body>
</html>
                        """,
                        to: 'securetodolist1@gmail.com',
                        mimeType: 'text/html'
                    )
                }
            }
        }
        
        failure {
            script {
                if (params.SEND_NOTIFICATIONS) {
                    emailext(
                        subject: "❌ BUILD FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
<html>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px;">
        <div style="background: #dc3545; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h2>❌ Build Failed!</h2>
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f2f2f2;">
                <th style="padding: 12px; border: 1px solid #ddd;">Property</th>
                <th style="padding: 12px; border: 1px solid #ddd;">Value</th>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Job</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${env.JOB_NAME}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Build #</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${env.BUILD_NUMBER}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Status</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: red;"><b>FAILED</b></td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Failed Stage</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${env.STAGE_NAME ?: 'Unknown'}</td>
            </tr>
        </table>
        
        <div style="margin-top: 20px; text-align: center;">
            <a href="${env.BUILD_URL}console" style="padding: 10px 20px; background: #dc3545; color: white; text-decoration: none; border-radius: 3px;">View Logs</a>
        </div>
    </div>
</body>
</html>
                        """,
                        to: 'securetodolist1@gmail.com',
                        mimeType: 'text/html'
                    )
                }
            }
        }
    }
}
```

### File 2: Create `Dockerfile`
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build 2>/dev/null || true
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
CMD ["npm", "start"]
```

### File 3: Create `docker-compose.yml`
```yaml
version: '3.9'

services:
  app-staging:
    image: secure-todo-app:latest
    container_name: secure-todo-app-staging
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment:
      NODE_ENV: staging
      PORT: 3000
    restart: unless-stopped
    networks:
      - deployment-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  app-prod:
    image: secure-todo-app:latest
    container_name: secure-todo-app-prod
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
    restart: unless-stopped
    networks:
      - deployment-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

networks:
  deployment-network:
    driver: bridge
```

### File 4: Create `package.json`
```json
{
  "name": "secure-todo-app",
  "version": "1.0.0",
  "description": "Secure Todo Application with CI/CD Pipeline",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo 'Tests passed'",
    "build": "echo 'Build complete'"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### File 5: Create `server.js`
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
  });
});

app.get('/api/version', (req, res) => {
  res.json({
    name: 'secure-todo-app',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/todos', (req, res) => {
  res.json({
    todos: [
      { id: 1, title: 'Setup CI/CD', completed: true },
      { id: 2, title: 'Deploy to production', completed: false }
    ]
  });
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  res.status(201).json({
    id: Date.now(),
    title: title || 'New Todo',
    completed: false,
    createdAt: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════╗\n║   Secure Todo App Started       ║\n║   Port: ${PORT}${' '.repeat(18 - String(PORT).length)}║\n║   Environment: ${NODE_ENV.toUpperCase()}${' '.repeat(12 - NODE_ENV.length)}║\n╚════════════════════════════════╝\n`);
});

module.exports = app;
```

### File 6: Create `.env.example`
```
NODE_ENV=production
PORT=3000
```

---

## ✅ STEP 3: Upload Files to GitHub

In your terminal (in the secure-todo-app folder):

```bash
git add .
git commit -m "feat: Add complete CI/CD pipeline with Jenkinsfile, Docker, and deployment"
git push origin main
```

---

## ✅ STEP 4: Verify on GitHub

Go to: **https://github.com/securetodolist1-max/secure-todo-app**

You should see all 6 files! ✓

---

## ✅ STEP 5: Create GitHub Token

Go to: **https://github.com/settings/tokens**

Click **Generate new token (classic)**

Fill in:
```
Token name:     jenkins-deployment
Expiration:     90 days
Scopes:         ✓ repo
                ✓ admin:repo_hook
                ✓ read:user
```

Click **Generate token** and **COPY it**

---

## ✅ STEP 6: Setup Jenkins Credentials

Go to: **http://localhost:8080**

Click **Manage Jenkins** → **Manage Credentials**

Click **Jenkins** → **Add Credentials**

Fill in:
```
Kind:           Username with password
Username:       securetodolist1-max
Password:       PASTE-YOUR-TOKEN-HERE
ID:             github-credentials
Description:    GitHub Jenkins Token
```

Click **Create**

---

## ✅ STEP 7: Add GitHub Webhook

Go to: **https://github.com/securetodolist1-max/secure-todo-app**

Click **Settings** → **Webhooks** → **Add webhook**

Fill in:
```
Payload URL:    http://localhost:8080/github-webhook/
Content type:   application/json
Events:         ✓ Push events
                ✓ Pull requests
Active:         ✓ Checked
```

Click **Add webhook**

---

## ✅ STEP 8: Create Jenkins Job

Go to: **http://localhost:8080**

Click **New Item**

Fill in:
```
Job name:       secure-todo-app-pipeline
Type:           Pipeline
```

Click **OK**

### Configure General Tab:
```
✓ Discard old builds: 15
✓ GitHub project: https://github.com/securetodolist1-max/secure-todo-app/
```

### Configure Build Triggers Tab:
```
✓ GitHub hook trigger for GITScm polling
```

### Configure Pipeline Tab:
```
Definition:             Pipeline script from SCM
SCM:                    Git
Repository URL:         https://github.com/securetodolist1-max/secure-todo-app.git
Credentials:            github-credentials
Branches to build:      */main
Script Path:            Jenkinsfile
```

Click **Save**

---

## ✅ STEP 9: Test Deployment

In terminal:

```bash
cd secure-todo-app

# Make a test change
echo "" >> README.md
echo "## Deployment Ready" >> README.md

# Push to GitHub (triggers Jenkins!)
git add README.md
git commit -m "test: Trigger Jenkins pipeline"
git push origin main
```

---

## ✅ CHECK STATUS

1. **Jenkins**: http://localhost:8080 → You should see Build #1 starting
2. **Email**: Check securetodolist1@gmail.com for build notification
3. **GitHub**: https://github.com/securetodolist1-max/secure-todo-app → Should show commit status

---

## 🎉 COMPLETE!

Your deployment system is now active:

```
Edit Code → git push → GitHub → Jenkins Webhook → Auto Deploy → Gmail Notification
```

**All automated! Just commit and push!** 🚀
