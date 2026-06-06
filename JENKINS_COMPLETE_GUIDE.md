# Complete Jenkins Configuration & Pipeline Guide

## Part 1: Initial Jenkins Setup

### Step 1: Access Jenkins Dashboard
1. Open **http://localhost:8080** in your browser
2. You'll see the Jenkins unlock page
3. Enter initial admin password: **48f12177089c44068fc0253254f38401**

### Step 2: Install Suggested Plugins
- Click **Install suggested plugins**
- Wait for all plugins to install (may take 5-10 minutes)

### Step 3: Create First Admin User
- **Username**: admin (or your preferred username)
- **Password**: Create a strong password
- **Full name**: Your Name
- **Email address**: securetodolist1@gmail.com
- Click **Save and Continue**
- Click **Save and Finish**
- Click **Start using Jenkins**

---

## Part 2: Configure System Email Settings

### Step 1: Navigate to Configure System
1. Click **Manage Jenkins** (left sidebar)
2. Click **Configure System**

### Step 2: Configure Email Notification

Scroll down to find **Email Notification** section and fill in:

**SMTP Server Settings:**
- **SMTP server**: `smtp.gmail.com`
- **Default user e-mail suffix**: `@gmail.com`

**Authentication:**
- Check ✓ **Use SMTP Authentication**
- **User Name**: `securetodolist1@gmail.com`
- **Password**: `sweq wftk gzey molk` (your Gmail app password)

**Advanced Settings:**
- Click **Advanced** button
- **SMTP Port**: `587`
- Check ✓ **Use TLS**
- Check ✓ **Use SSL** (if available, usually unchecked for TLS)
- **Character set**: `UTF-8`

**Test Email:**
- Click **Test configuration by sending test e-mail**
- Enter test email recipient: `securetodolist1@gmail.com`
- Click **Test**
- You should see: "Email was successfully sent"
- Check your Gmail inbox

### Step 3: Configure Extended Email Notification (Optional but Recommended)

Scroll down to **Extended E-mail Notification**:

- **SMTP server**: `smtp.gmail.com`
- **SMTP port**: `587`
- **From**: `Jenkins <securetodolist1@gmail.com>`
- **Default Recipients**: `securetodolist1@gmail.com`
- **Default Subject**: `$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!`
- Check ✓ **Use TLS**
- Check ✓ **Use Authentication**
- **Username**: `securetodolist1@gmail.com`
- **Password**: `sweq wftk gzey molk`

### Step 4: Save Configuration
- Scroll to bottom
- Click **Save**

---

## Part 3: Install Required Plugins

### Step 1: Open Plugin Manager
1. Click **Manage Jenkins**
2. Click **Plugin Manager**
3. Click **Available plugins** tab

### Step 2: Search and Install Plugins
Install these plugins for email functionality:

1. **Email Extension** (for advanced email features)
   - Search: "Email Extension"
   - Check the box
   - Click **Install without restart**

2. **Pipeline** (for declarative pipelines)
   - Search: "Pipeline"
   - Check: "Pipeline" and "Pipeline: Stage View"
   - Click **Install without restart**

3. **Git** (for GitHub integration)
   - Search: "Git"
   - Click **Install without restart**

4. **GitHub** (for GitHub webhooks)
   - Search: "GitHub"
   - Click **Install without restart**

After installing all plugins, click **Manage Jenkins** → **Restart Jenkins**

---

## Part 4: Create Your First Pipeline Job

### Step 1: Create New Job
1. Click **New Item** (or **Create a job**)
2. Enter **Job name**: `hello-deployment`
3. Select **Pipeline**
4. Click **OK**

### Step 2: Configure Pipeline

**General Tab:**
- Check ✓ **Discard old builds**
  - Max # of builds to keep: `10`
- Check ✓ **This project is parameterized** (optional)

**Build Triggers Tab:**
- Check ✓ **GitHub hook trigger for GITScm polling** (if using GitHub)
- Or check ✓ **Poll SCM** and set: `H/15 * * * *` (every 15 minutes)

**Pipeline Tab:**

Select **Pipeline script** and paste this basic example:

```groovy
pipeline {
    agent any
    
    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    parameters {
        string(name: 'ENVIRONMENT', defaultValue: 'staging', description: 'Deployment environment')
        choice(name: 'ACTION', choices: ['build', 'deploy', 'rollback'], description: 'Action to perform')
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out code..."
                    // For GitHub: git branch: 'main', url: 'https://github.com/your-repo.git'
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo "Building application..."
                    echo "Environment: ${params.ENVIRONMENT}"
                    echo "Action: ${params.ACTION}"
                    // Add your build commands: npm install, npm run build, etc.
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    echo "Running tests..."
                    // Add your test commands: npm test, pytest, etc.
                }
            }
        }
        
        stage('Deploy') {
            when {
                expression { params.ACTION == 'deploy' }
            }
            steps {
                script {
                    echo "Deploying to ${params.ENVIRONMENT}..."
                    // Add your deployment commands
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline execution completed"
            cleanWs()
        }
        
        success {
            emailext(
                subject: "✓ BUILD SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <html>
                        <body>
                            <h2 style="color: green;">Build Successful!</h2>
                            <table border="1" cellpadding="10">
                                <tr>
                                    <td><b>Job Name:</b></td>
                                    <td>${env.JOB_NAME}</td>
                                </tr>
                                <tr>
                                    <td><b>Build Number:</b></td>
                                    <td>#${env.BUILD_NUMBER}</td>
                                </tr>
                                <tr>
                                    <td><b>Build Status:</b></td>
                                    <td><span style="color: green;">SUCCESS</span></td>
                                </tr>
                                <tr>
                                    <td><b>Build Duration:</b></td>
                                    <td>${currentBuild.durationString}</td>
                                </tr>
                                <tr>
                                    <td><b>Timestamp:</b></td>
                                    <td>${new Date()}</td>
                                </tr>
                                <tr>
                                    <td><b>Build URL:</b></td>
                                    <td><a href="${env.BUILD_URL}">Click here to view</a></td>
                                </tr>
                            </table>
                            <p>Console output: <a href="${env.BUILD_URL}console">View Logs</a></p>
                        </body>
                    </html>
                """,
                to: 'securetodolist1@gmail.com',
                mimeType: 'text/html'
            )
        }
        
        failure {
            emailext(
                subject: "✗ BUILD FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <html>
                        <body>
                            <h2 style="color: red;">Build Failed!</h2>
                            <table border="1" cellpadding="10">
                                <tr>
                                    <td><b>Job Name:</b></td>
                                    <td>${env.JOB_NAME}</td>
                                </tr>
                                <tr>
                                    <td><b>Build Number:</b></td>
                                    <td>#${env.BUILD_NUMBER}</td>
                                </tr>
                                <tr>
                                    <td><b>Build Status:</b></td>
                                    <td><span style="color: red;">FAILED</span></td>
                                </tr>
                                <tr>
                                    <td><b>Build Duration:</b></td>
                                    <td>${currentBuild.durationString}</td>
                                </tr>
                                <tr>
                                    <td><b>Timestamp:</b></td>
                                    <td>${new Date()}</td>
                                </tr>
                                <tr>
                                    <td><b>Build URL:</b></td>
                                    <td><a href="${env.BUILD_URL}">Click here to view</a></td>
                                </tr>
                            </table>
                            <p><b>Console output:</b> <a href="${env.BUILD_URL}console">View Logs</a></p>
                        </body>
                    </html>
                """,
                to: 'securetodolist1@gmail.com',
                mimeType: 'text/html'
            )
        }
        
        unstable {
            emailext(
                subject: "⚠ BUILD UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <html>
                        <body>
                            <h2 style="color: orange;">Build Unstable</h2>
                            <p>The build completed but with warnings.</p>
                            <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                        </body>
                    </html>
                """,
                to: 'securetodolist1@gmail.com',
                mimeType: 'text/html'
            )
        }
    }
}
```

### Step 3: Save and Run
- Click **Save**
- Click **Build Now**
- Watch the build progress in real-time
- Check your email for notifications

---

## Part 5: Advanced Pipeline Examples

### Example 1: Node.js Application Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        NODE_ENV = 'production'
        APP_NAME = 'my-app'
        REGISTRY = 'docker.io'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/my-app.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${REGISTRY}/${APP_NAME}:${BUILD_NUMBER} .'
            }
        }
        
        stage('Push to Registry') {
            steps {
                sh 'docker push ${REGISTRY}/${APP_NAME}:${BUILD_NUMBER}'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker run -d --name ${APP_NAME} -p 3000:3000 ${REGISTRY}/${APP_NAME}:${BUILD_NUMBER}
                '''
            }
        }
    }
    
    post {
        success {
            emailext(
                subject: "✓ App Deployed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Node.js app deployed successfully to production!",
                to: 'securetodolist1@gmail.com'
            )
        }
        failure {
            emailext(
                subject: "✗ Deployment Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Check logs at ${env.BUILD_URL}console",
                to: 'securetodolist1@gmail.com'
            )
        }
    }
}
```

### Example 2: Python Application Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/python-app.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    python -m venv venv
                    source venv/bin/activate
                    pip install -r requirements.txt
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '''
                    source venv/bin/activate
                    pytest --cov=app --cov-report=xml
                '''
            }
        }
        
        stage('Code Quality') {
            steps {
                sh '''
                    source venv/bin/activate
                    flake8 app/
                    pylint app/
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'echo "Deploying Python app..."'
            }
        }
    }
    
    post {
        success {
            emailext(
                subject: "✓ Python App Deployed: ${env.JOB_NAME}",
                body: "Python application deployed successfully!",
                to: 'securetodolist1@gmail.com'
            )
        }
        failure {
            emailext(
                subject: "✗ Python Deployment Failed",
                body: "Check logs: ${env.BUILD_URL}console",
                to: 'securetodolist1@gmail.com'
            )
        }
    }
}
```

### Example 3: Docker Multi-Stage Build Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'my-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'docker.io'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/my-app.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                        docker build \\
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \\
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest \\
                            .
                    '''
                }
            }
        }
        
        stage('Run Container Tests') {
            steps {
                script {
                    sh '''
                        docker run --rm \\
                            ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \\
                            npm test
                    '''
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    sh '''
                        docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
                        docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'echo "Deploying to production..."'
            }
        }
    }
    
    post {
        success {
            emailext(
                subject: "✓ Docker Image Built & Pushed: ${IMAGE_NAME}:${IMAGE_TAG}",
                body: """
                    Image successfully built and pushed!
                    Registry: ${DOCKER_REGISTRY}
                    Image: ${IMAGE_NAME}:${IMAGE_TAG}
                """,
                to: 'securetodolist1@gmail.com'
            )
        }
        failure {
            emailext(
                subject: "✗ Docker Build Failed",
                body: "Build failed at stage: ${env.STAGE_NAME}",
                to: 'securetodolist1@gmail.com'
            )
        }
    }
}
```

---

## Part 6: Webhook Integration (GitHub)

### Step 1: Add GitHub Credentials to Jenkins
1. Click **Manage Jenkins** → **Manage Credentials**
2. Click **Jenkins** (global)
3. Click **Add Credentials**
   - Kind: **Username with password**
   - Username: your GitHub username
   - Password: your GitHub personal access token
   - ID: `github-credentials`
   - Click **Create**

### Step 2: Configure GitHub Webhook
1. Go to your GitHub repository
2. Click **Settings** → **Webhooks**
3. Click **Add webhook**
4. Payload URL: `http://your-jenkins-server:8080/github-webhook/`
5. Content type: `application/json`
6. Events: Select "Push events" and "Pull requests"
7. Active: Check ✓
8. Click **Add webhook**

### Step 3: Update Pipeline to Use Git
In your Jenkins pipeline script, replace the checkout stage:

```groovy
stage('Checkout') {
    steps {
        git branch: 'main', 
            url: 'https://github.com/your-username/your-repo.git',
            credentialsId: 'github-credentials'
    }
}
```

---

## Part 7: Credentials Management

### Add Credentials for Docker, AWS, etc.

1. **Manage Jenkins** → **Manage Credentials**
2. Click **Jenkins** (global)
3. Click **Add Credentials**

**For Docker Registry:**
- Kind: **Username with password**
- Username: docker username
- Password: docker personal access token
- ID: `docker-credentials`

**For AWS:**
- Kind: **AWS Credentials**
- Access Key ID: your AWS access key
- Secret Access Key: your AWS secret key
- ID: `aws-credentials`

Use in pipeline:
```groovy
withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
}
```

---

## Part 8: Troubleshooting

### Email Not Sending?
1. Check logs: **Manage Jenkins** → **System log**
2. Verify credentials: **Configure System** → **Test configuration**
3. Ensure Gmail app password is correct (16 chars, no spaces)
4. Check firewall: Ensure port 587 is open
5. Enable 2-Step Verification on Gmail account

### Pipeline Build Fails?
1. Click on failed build number
2. Click **Console Output**
3. Scroll to find error message
4. Fix the issue and rebuild

### GitHub Webhook Not Triggering?
1. Go to GitHub repo → Settings → Webhooks
2. Check "Recent Deliveries" tab
3. Look for red X marks (failures)
4. Verify Jenkins URL is accessible from GitHub
5. Check Build Triggers in Jenkins job configuration

---

## Part 9: Email Notification Examples

### Custom HTML Email with Build Details
```groovy
emailext(
    subject: "Build Notification: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
    body: """
        <html>
            <body>
                <h1>Build Report</h1>
                <p><b>Job:</b> ${env.JOB_NAME}</p>
                <p><b>Build #:</b> ${env.BUILD_NUMBER}</p>
                <p><b>Status:</b> ${currentBuild.result}</p>
                <p><b>Duration:</b> ${currentBuild.durationString}</p>
                <hr/>
                <h2>Changes</h2>
                <p>${currentBuild.changeSets}</p>
                <hr/>
                <a href="${env.BUILD_URL}">View Full Build</a>
            </body>
        </html>
    """,
    to: 'securetodolist1@gmail.com',
    mimeType: 'text/html'
)
```

### Send Email Only on Failure
```groovy
post {
    failure {
        emailext(
            subject: "ALERT: Build Failed - ${env.JOB_NAME}",
            body: "Build failed. Please investigate immediately!\n\nDetails: ${env.BUILD_URL}",
            to: 'securetodolist1@gmail.com',
            recipientProviders: [developers(), requestor()]
        )
    }
}
```

---

## Summary Checklist

✓ Jenkins installed and running on http://localhost:8080
✓ Email notifications configured with securetodolist1@gmail.com
✓ SMTP settings: smtp.gmail.com:587 with TLS
✓ Email Extension plugin installed
✓ First pipeline job created
✓ Email notifications tested and working
✓ GitHub webhook configured (optional)
✓ Docker support configured (optional)
✓ Ready for production deployments!
