pipeline {
    agent any
    
    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo "Build completed"
            }
        }
        
        stage('Deploy') {
            steps {
                echo "Deployment ready"
            }
        }
    }
    
    post {
        success {
            script {
                emailext(
                    subject: "✅ BUILD SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
<html>
<body style="font-family: Arial, sans-serif;">
    <h2 style="color: green;">✅ Build Successful!</h2>
    <p><b>Job:</b> ${env.JOB_NAME}</p>
    <p><b>Build #:</b> ${env.BUILD_NUMBER}</p>
    <p><b>Status:</b> SUCCESS</p>
    <p><b>URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
</body>
</html>
                    """,
                    to: 'securetodolist1@gmail.com',
                    mimeType: 'text/html'
                )
            }
        }
        
        failure {
            script {
                emailext(
                    subject: "❌ BUILD FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
<html>
<body style="font-family: Arial, sans-serif;">
    <h2 style="color: red;">❌ Build Failed!</h2>
    <p><b>Job:</b> ${env.JOB_NAME}</p>
    <p><b>Build #:</b> ${env.BUILD_NUMBER}</p>
    <p><b>Status:</b> FAILED</p>
    <p><b>Console:</b> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
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
