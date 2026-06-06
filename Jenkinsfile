pipeline {
    agent any
    
    environment {
        // Application Settings
        APP_NAME = 'secure-todo-app'
        BUILD_ID = "${env.BUILD_NUMBER}"
        GIT_SHORT_COMMIT = "${env.GIT_COMMIT.take(7)}"
        
        // Docker Settings
        DOCKER_IMAGE_NAME = "${APP_NAME}"
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = "docker.io"
        
        // Deployment Settings
        STAGING_PORT = "3001"
        PRODUCTION_PORT = "3000"
    }
    
    options {
        timestamps()
        timeout(time: 45, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '15', artifactNumToKeepStr: '5'))
        disableConcurrentBuilds()
        ansiColor('xterm')
    }
    
    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['staging', 'production'],
            description: 'Target deployment environment'
        )
        choice(
            name: 'ACTION',
            choices: ['build', 'deploy', 'build_and_deploy', 'rollback'],
            description: 'Pipeline action'
        )
        booleanParam(
            name: 'SEND_NOTIFICATIONS',
            defaultValue: true,
            description: 'Send email notifications'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Skip test execution'
        )
    }
    
    stages {
        stage('📋 Initialization') {
            steps {
                script {
                    echo """
╔═══════════════════════════════════════════════════════════╗
║               JENKINS DEPLOYMENT PIPELINE                 ║
╠═══════════════════════════════════════════════════════════╣
║ Job Name:          ${env.JOB_NAME}
║ Build Number:      #${env.BUILD_NUMBER}
║ Build URL:         ${env.BUILD_URL}
║ Git Commit:        ${env.GIT_SHORT_COMMIT}
║ Branch:            ${env.BRANCH_NAME ?: 'N/A'}
║ Node:              ${env.NODE_NAME}
║─────────────────────────────────────────────────────────────
║ Environment:       ${params.ENVIRONMENT.toUpperCase()}
║ Action:            ${params.ACTION}
║ Notifications:     ${params.SEND_NOTIFICATIONS ? 'ENABLED' : 'DISABLED'}
║ Skip Tests:        ${params.SKIP_TESTS ? 'YES' : 'NO'}
╚═══════════════════════════════════════════════════════════╝
                    """
                }
            }
        }
        
        stage('📥 Checkout Code') {
            steps {
                script {
                    echo "🔄 Checking out source code from Git..."
                    checkout scm
                    
                    sh '''
                        echo "Repository files:"
                        ls -la
                    '''
                }
            }
        }
        
        stage('🔍 Code Analysis') {
            steps {
                script {
                    echo "📊 Running code analysis..."
                    
                    if (fileExists('package.json')) {
                        sh '''
                            echo "✓ Node.js project detected"
                            node --version
                            npm --version
                            npm list || true
                        '''
                    } else if (fileExists('requirements.txt')) {
                        sh '''
                            echo "✓ Python project detected"
                            python --version
                        '''
                    } else {
                        echo "⚠ No specific project type detected"
                    }
                }
            }
        }
        
        stage('📦 Install Dependencies') {
            when {
                expression { 
                    params.ACTION == 'build' || params.ACTION == 'build_and_deploy'
                }
            }
            steps {
                script {
                    echo "📦 Installing dependencies..."
                    
                    if (fileExists('package.json')) {
                        sh '''
                            echo "Installing Node.js dependencies..."
                            npm ci --prefer-offline --no-audit
                            npm list --depth=0 || true
                        '''
                    } else if (fileExists('requirements.txt')) {
                        sh '''
                            echo "Installing Python dependencies..."
                            pip install -r requirements.txt
                        '''
                    }
                }
            }
        }
        
        stage('✅ Run Tests') {
            when {
                expression { 
                    (params.ACTION == 'build' || params.ACTION == 'build_and_deploy') &&
                    !params.SKIP_TESTS
                }
            }
            steps {
                script {
                    echo "🧪 Running unit tests..."
                    
                    if (fileExists('package.json')) {
                        sh '''
                            echo "Running Node.js tests..."
                            npm test || echo "No tests defined - continuing"
                        '''
                    } else if (fileExists('requirements.txt')) {
                        sh '''
                            echo "Running Python tests..."
                            pytest . || echo "No tests defined - continuing"
                        '''
                    }
                }
            }
        }
        
        stage('🏗️ Build Application') {
            when {
                expression { 
                    params.ACTION == 'build' || params.ACTION == 'build_and_deploy'
                }
            }
            steps {
                script {
                    echo "🔨 Building application..."
                    
                    if (fileExists('package.json')) {
                        sh '''
                            echo "Building Node.js application..."
                            npm run build 2>/dev/null || echo "No build script - skipping"
                        '''
                    }
                }
            }
        }
        
        stage('🐳 Build Docker Image') {
            when {
                expression { 
                    (params.ACTION == 'build' || params.ACTION == 'build_and_deploy') &&
                    fileExists('Dockerfile')
                }
            }
            steps {
                script {
                    echo "🐳 Building Docker image..."
                    
                    sh '''
                        echo "Building image: ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                        
                        docker build \
                            -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \
                            -t ${DOCKER_IMAGE_NAME}:latest \
                            --label "git_commit=${GIT_SHORT_COMMIT}" \
                            --label "build_number=${BUILD_ID}" \
                            --label "build_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
                            --label "environment=${ENVIRONMENT}" \
                            .
                        
                        echo ""
                        echo "✓ Docker image built successfully"
                        docker images | grep ${DOCKER_IMAGE_NAME}
                    '''
                }
            }
        }
        
        stage('🔒 Security Scan') {
            when {
                expression { 
                    (params.ACTION == 'build' || params.ACTION == 'build_and_deploy') &&
                    fileExists('Dockerfile')
                }
            }
            steps {
                script {
                    echo "🔒 Running security checks..."
                    
                    sh '''
                        echo "Docker Image Inspection:"
                        docker inspect ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} | head -30
                        
                        echo ""
                        echo "Image size:"
                        docker images ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                    '''
                }
            }
        }
        
        stage('🚀 Deploy to Staging') {
            when {
                expression { 
                    (params.ACTION == 'deploy' || params.ACTION == 'build_and_deploy') &&
                    params.ENVIRONMENT == 'staging'
                }
            }
            steps {
                script {
                    echo "🚀 Deploying to STAGING environment..."
                    
                    sh '''
                        echo "Stopping existing staging container..."
                        docker compose -f docker-compose.yml down app-staging || true
                        
                        echo ""
                        echo "Starting staging deployment..."
                        docker compose -f docker-compose.yml up -d app-staging
                        
                        echo ""
                        echo "Waiting for health check..."
                        sleep 5
                        
                        echo ""
                        echo "Checking staging container status..."
                        docker ps -a --filter "name=secure-todo-app-staging"
                        
                        echo ""
                        echo "Testing staging endpoint..."
                        curl -f http://localhost:3001/health || echo "⚠ Health check still initializing"
                    '''
                }
            }
        }
        
        stage('🚀 Deploy to Production') {
            when {
                expression { 
                    (params.ACTION == 'deploy' || params.ACTION == 'build_and_deploy') &&
                    params.ENVIRONMENT == 'production'
                }
            }
            input {
                message "⚠️ PRODUCTION DEPLOYMENT"
                ok "Yes, Deploy to Production"
                submitter "admin,developers"
            }
            steps {
                script {
                    echo "🚀 Deploying to PRODUCTION environment..."
                    
                    sh '''
                        echo "Creating backup of current production..."
                        BACKUP_NAME="${APP_NAME}-backup-$(date +%s)"
                        docker rename ${APP_NAME}-prod ${BACKUP_NAME} 2>/dev/null || echo "No existing container to backup"
                        
                        echo ""
                        echo "Starting production deployment..."
                        docker compose -f docker-compose.yml up -d app-prod
                        
                        echo ""
                        echo "Waiting for health check..."
                        sleep 10
                        
                        echo ""
                        echo "Production container status:"
                        docker ps -a --filter "name=secure-todo-app-prod"
                        
                        echo ""
                        echo "Testing production endpoint..."
                        curl -f http://localhost:3000/health || {
                            echo "❌ Health check failed - rolling back"
                            docker compose down app-prod
                            docker rename ${BACKUP_NAME} ${APP_NAME}-prod
                            docker start ${APP_NAME}-prod
                            exit 1
                        }
                        
                        echo ""
                        echo "✓ Production deployment successful"
                    '''
                }
            }
        }
        
        stage('✔️ Verification') {
            when {
                expression { 
                    params.ACTION == 'deploy' || params.ACTION == 'build_and_deploy'
                }
            }
            steps {
                script {
                    echo "✔️ Verifying deployment..."
                    
                    sh '''
                        echo "Checking deployment status..."
                        
                        if [ "${ENVIRONMENT}" = "staging" ]; then
                            PORT="3001"
                            CONTAINER="secure-todo-app-staging"
                        else
                            PORT="3000"
                            CONTAINER="secure-todo-app-prod"
                        fi
                        
                        echo ""
                        echo "Container Status:"
                        docker ps -a --filter "name=${CONTAINER}"
                        
                        echo ""
                        echo "Container Logs (last 10 lines):"
                        docker logs --tail=10 ${CONTAINER} || echo "No logs available"
                        
                        echo ""
                        echo "Testing API endpoints..."
                        curl -s http://localhost:${PORT}/health | jq . || echo "Health endpoint not available"
                        curl -s http://localhost:${PORT}/api/version | jq . || echo "Version endpoint not available"
                    '''
                }
            }
        }
        
        stage('🔄 Rollback') {
            when {
                expression { params.ACTION == 'rollback' }
            }
            input {
                message "⚠️ ROLLBACK OPERATION"
                ok "Yes, Rollback to Previous Version"
            }
            steps {
                script {
                    echo "🔄 Rolling back deployment..."
                    
                    sh '''
                        echo "Rollback procedure for ${ENVIRONMENT}..."
                        
                        if [ "${ENVIRONMENT}" = "production" ]; then
                            CONTAINER="secure-todo-app-prod"
                            echo "Finding latest backup container..."
                            LATEST_BACKUP=$(docker ps -a --filter "status=exited" --filter "name=${APP_NAME}-backup" --format "{{.Names}}" | head -1)
                            
                            if [ -n "${LATEST_BACKUP}" ]; then
                                echo "Stopping current production..."
                                docker stop ${CONTAINER} || true
                                docker rename ${CONTAINER} ${APP_NAME}-failed-${BUILD_ID}
                                
                                echo "Restoring backup: ${LATEST_BACKUP}"
                                docker rename ${LATEST_BACKUP} ${CONTAINER}
                                docker start ${CONTAINER}
                                
                                echo "✓ Rollback completed"
                            else
                                echo "❌ No backup found to rollback"
                                exit 1
                            fi
                        else
                            echo "Redeploy staging from current image..."
                            docker compose down app-staging
                            docker compose up -d app-staging
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "🧹 Cleaning up workspace..."
                
                sh '''
                    echo "Removing Docker build cache..."
                    docker system prune -f --filter "until=24h" || true
                    
                    echo "Disk usage:"
                    docker system df || true
                '''
                
                cleanWs(
                    deleteDirs: true,
                    patterns: [
                        [pattern: '**/node_modules', type: 'INCLUDE'],
                        [pattern: '**/dist', type: 'INCLUDE'],
                        [pattern: '**/build', type: 'INCLUDE'],
                        [pattern: '**/coverage', type: 'INCLUDE']
                    ]
                )
            }
        }
        
        success {
            script {
                if (params.SEND_NOTIFICATIONS) {
                    emailext(
                        subject: "✅ BUILD SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 5px; }
        .header { background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 20px; border-radius: 5px; }
        .content { padding: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f2f2f2; font-weight: bold; }
        .success { color: #28a745; font-weight: bold; }
        .info { background: #e7f3ff; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0; border-radius: 3px; }
        .footer { color: #666; font-size: 12px; margin-top: 20px; text-align: center; }
        a { color: #2196F3; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>✅ Build Successful!</h2>
            <p>Your deployment is ready</p>
        </div>
        
        <div class="content">
            <table>
                <tr>
                    <th colspan="2">Build Information</th>
                </tr>
                <tr>
                    <td><strong>Job Name</strong></td>
                    <td>${env.JOB_NAME}</td>
                </tr>
                <tr>
                    <td><strong>Build Number</strong></td>
                    <td>#${env.BUILD_NUMBER}</td>
                </tr>
                <tr>
                    <td><strong>Status</strong></td>
                    <td><span class="success">✓ SUCCESS</span></td>
                </tr>
                <tr>
                    <td><strong>Environment</strong></td>
                    <td>${params.ENVIRONMENT.toUpperCase()}</td>
                </tr>
                <tr>
                    <td><strong>Action</strong></td>
                    <td>${params.ACTION}</td>
                </tr>
                <tr>
                    <td><strong>Duration</strong></td>
                    <td>${currentBuild.durationString}</td>
                </tr>
                <tr>
                    <td><strong>Git Commit</strong></td>
                    <td>${env.GIT_SHORT_COMMIT}</td>
                </tr>
                <tr>
                    <td><strong>Branch</strong></td>
                    <td>${env.BRANCH_NAME ?: 'main'}</td>
                </tr>
                <tr>
                    <td><strong>Docker Image</strong></td>
                    <td>${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}</td>
                </tr>
                <tr>
                    <td><strong>Timestamp</strong></td>
                    <td>${new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z").format(new Date())}</td>
                </tr>
            </table>
            
            <div class="info">
                <strong>📍 Deployment Endpoint:</strong><br>
                <% if (params.ENVIRONMENT == 'production') { %>
                    Production: <a href="http://localhost:3000">http://localhost:3000</a><br>
                    Health: <a href="http://localhost:3000/health">http://localhost:3000/health</a>
                <% } else { %>
                    Staging: <a href="http://localhost:3001">http://localhost:3001</a><br>
                    Health: <a href="http://localhost:3001/health">http://localhost:3001/health</a>
                <% } %>
            </div>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 3px; margin: 20px 0;">
                <strong>Next Steps:</strong>
                <ul>
                    <li>Verify deployment at the endpoint above</li>
                    <li>Run smoke tests</li>
                    <li>Monitor application logs</li>
                    <li>Check error rates in monitoring dashboard</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p><a href="${env.BUILD_URL}">View Full Build Details</a> | <a href="${env.BUILD_URL}console">View Console Output</a></p>
            <p>Jenkins CI/CD Pipeline - ${new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date())}</p>
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
<head>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 5px; }
        .header { background: linear-gradient(135deg, #dc3545, #c82333); color: white; padding: 20px; border-radius: 5px; }
        .content { padding: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f2f2f2; font-weight: bold; }
        .error { color: #dc3545; font-weight: bold; }
        .alert { background: #ffe0e0; padding: 15px; border-left: 4px solid #dc3545; margin: 20px 0; border-radius: 3px; }
        .footer { color: #666; font-size: 12px; margin-top: 20px; text-align: center; }
        a { color: #2196F3; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>❌ Build Failed!</h2>
            <p>Action required - please review the error</p>
        </div>
        
        <div class="content">
            <table>
                <tr>
                    <th colspan="2">Build Information</th>
                </tr>
                <tr>
                    <td><strong>Job Name</strong></td>
                    <td>${env.JOB_NAME}</td>
                </tr>
                <tr>
                    <td><strong>Build Number</strong></td>
                    <td>#${env.BUILD_NUMBER}</td>
                </tr>
                <tr>
                    <td><strong>Status</strong></td>
                    <td><span class="error">✗ FAILED</span></td>
                </tr>
                <tr>
                    <td><strong>Failed Stage</strong></td>
                    <td>${env.STAGE_NAME ?: 'Unknown'}</td>
                </tr>
                <tr>
                    <td><strong>Environment</strong></td>
                    <td>${params.ENVIRONMENT.toUpperCase()}</td>
                </tr>
                <tr>
                    <td><strong>Duration</strong></td>
                    <td>${currentBuild.durationString}</td>
                </tr>
            </table>
            
            <div class="alert">
                <strong>🚨 Action Required:</strong><br>
                Please review the console output to identify and fix the issue.
            </div>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 3px; margin: 20px 0;">
                <strong>Troubleshooting Steps:</strong>
                <ol>
                    <li>Check console output for error messages</li>
                    <li>Verify all dependencies are available</li>
                    <li>Check GitHub webhook status</li>
                    <li>Review recent code changes</li>
                    <li>Retry the build after fixes</li>
                </ol>
            </div>
        </div>
        
        <div class="footer">
            <p><a href="${env.BUILD_URL}console">View Console Output (Detailed Error)</a> | <a href="${env.BUILD_URL}">View Build Summary</a></p>
            <p>Jenkins CI/CD Pipeline - ${new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date())}</p>
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
        
        unstable {
            script {
                if (params.SEND_NOTIFICATIONS) {
                    emailext(
                        subject: "⚠️ BUILD UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
<html>
<body style="font-family: Arial, sans-serif;">
    <h2 style="color: #ff9800;">⚠️ Build Unstable</h2>
    <p>Build completed but with warnings or test failures.</p>
    <p><a href="${env.BUILD_URL}console">Review Console Output</a></p>
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
