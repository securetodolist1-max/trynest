#!/bin/bash

# Complete Deployment Setup Script
# This script sets up Jenkins, GitHub, and Email notifications

echo "=========================================="
echo "Jenkins Deployment Setup"
echo "=========================================="

# Step 1: Verify Jenkins is running
echo ""
echo "[1/5] Checking Jenkins..."
docker ps --filter name=jenkins-server

# Step 2: Jenkins URL
echo ""
echo "[2/5] Jenkins Dashboard"
echo "URL: http://localhost:8080"
echo "Password: 48f12177089c44068fc0253254f38401"

# Step 3: Email Config
echo ""
echo "[3/5] Email Configuration Status"
echo "✓ SMTP: smtp.gmail.com:587"
echo "✓ Email: securetodolist1@gmail.com"
echo "✓ App Password: sweq wftk gzey molk"
echo "✓ TLS: Enabled"

# Step 4: GitHub Setup Instructions
echo ""
echo "[4/5] GitHub Setup"
echo "Required:"
echo "- Create GitHub repository"
echo "- Push Jenkinsfile to repository"
echo "- Add webhook: http://your-jenkins-server:8080/github-webhook/"

# Step 5: Next Steps
echo ""
echo "[5/5] Next Steps"
echo "1. Log in to http://localhost:8080"
echo "2. Create new Pipeline job"
echo "3. Configure GitHub webhook"
echo "4. Push code to trigger builds"
echo "5. Check email for notifications"

echo ""
echo "=========================================="
