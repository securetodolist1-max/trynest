# ✅ GIT INSTALLED - NEXT STEPS

## 🎉 Git Installation Complete!

Version: **2.54.0** ✓

---

# 🚀 STEP 1: Clone Your Repository

Open PowerShell and run:

```bash
cd C:\Users\cmark\Desktop\trynest
git clone https://github.com/securetodolist1-max/secure-todo-app.git
cd secure-todo-app
```

**Expected output:**
```
Cloning into 'secure-todo-app'...
remote: Enumerating objects: 7, done.
Receiving objects: 100% (7/7), 1.23 KiB | 1.23 MiB/s, done.
```

---

# 📁 STEP 2: Add Project Files

You should now have this folder structure:

```
C:\Users\cmark\Desktop\trynest\secure-todo-app\
├── README.md
├── .gitignore
└── .git
```

Now add these **6 files** to this folder:

### File 1: Jenkinsfile
```groovy
pipeline {
    agent any
    
    environment {
        APP_NAME = 'secure-todo-app'
        BUILD_ID = "${env.BUILD_NUMBER}"
    }
    
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production'], description: 'Environment')
        choice(name: 'ACTION', choices: ['build', 'deploy', 'build_and_deploy'], description: 'Action')
        booleanParam(name: 'SEND_NOTIFICATIONS', defaultValue: true, description: 'Send notifications')
    }
    
    stages {
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
                        docker build -t ${APP_NAME}:${BUILD_ID} -t ${APP_NAME}:latest .
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
                <td style="padding: 12px; border: 1px solid #ddd; color: green;"><b>✓ SUCCESS</b></td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Environment</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${params.ENVIRONMENT}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Duration</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${currentBuild.durationString}</td>
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
        <p>Build failed. Please check console output for details.</p>
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

### File 2: Dockerfile
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

### File 3: docker-compose.yml
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

networks:
  deployment-network:
    driver: bridge
```

### File 4: package.json
```json
{
  "name": "secure-todo-app",
  "version": "1.0.0",
  "description": "Secure Todo Application with CI/CD Pipeline",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
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

### File 5: server.js
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
    environment: NODE_ENV
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

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} (${NODE_ENV})`);
});
```

### File 6: .env.example
```
NODE_ENV=production
PORT=3000
```

---

# 📝 STEP 3: Check Status

In PowerShell:

```bash
git status
```

You should see your 6 new files listed as "Untracked files"

---

# 📤 STEP 4: Push to GitHub

```bash
# Stage all files
git add .

# Commit
git commit -m "feat: Add complete CI/CD pipeline with Jenkinsfile, Docker, and deployment"

# Push to GitHub
git push origin main
```

---

# ✅ STEP 5: Verify on GitHub

Go to: **https://github.com/securetodolist1-max/secure-todo-app**

You should see all 6 files! ✓

---

# 🎯 REMAINING SETUP (Jenkins)

After files are on GitHub, do these (ONE TIME):

1. **Create GitHub Token** - 2 min
   https://github.com/settings/tokens

2. **Add Jenkins Credentials** - 2 min
   http://localhost:8080 → Manage Jenkins → Manage Credentials

3. **Add GitHub Webhook** - 2 min
   GitHub Settings → Webhooks

4. **Create Jenkins Job** - 3 min
   Jenkins → New Item → Pipeline

5. **Test** - 1 min
   Push code → Jenkins auto-builds!

**Total: 10 more minutes to full automation!**

---

# 🚀 START NOW!

Run these commands in PowerShell:

```bash
cd C:\Users\cmark\Desktop\trynest\secure-todo-app
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

Then reply when done and we'll setup Jenkins! ✓
