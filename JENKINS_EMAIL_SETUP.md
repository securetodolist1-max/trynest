## Manual Jenkins Email Configuration

Follow these steps to configure Jenkins with your Gmail account (securetodolist1@gmail.com):

### Step 1: Access Jenkins Dashboard
- Open http://localhost:8080 in your browser
- Log in with the initial admin password: **43954701a87a4240b1bd2b48095e4059**

### Step 2: Navigate to Configure System
1. Click **Manage Jenkins** (top left menu)
2. Click **Configure System**

### Step 3: Configure Email Notification
Scroll down to **Email Notification** section and fill in:

- **SMTP server**: `smtp.gmail.com`
- **Default user e-mail suffix**: `@gmail.com`
- **SMTP Authentication**:
  - **Username**: `securetodolist1@gmail.com`
  - **Password**: `sweq wftk gzey molk` (your app password)
- **SMTP Port**: `587`
- Check ✓ **Use TLS**
- **Email address from system**: Leave as `Jenkins <Jenkins@$HOSTNAME.invalid>` or set to `securetodolist1@gmail.com`

### Step 4: Test Email Connection
- Click **Test configuration** button
- You should see a success message
- Check your inbox at securetodolist1@gmail.com for test email

### Step 5: Save Configuration
- Click **Save** button at bottom

### Step 6: Configure Extended Email (Optional but Recommended)
If you want advanced email features:
1. Go back to **Configure System**
2. Scroll to **Extended E-mail Notification**
3. Set same SMTP details as above
4. Default recipients: `securetodolist1@gmail.com`
5. Click **Save**

### Step 7: Install Email Extension Plugin (if needed)
1. Click **Manage Jenkins** → **Plugin Manager**
2. Search for "Email Extension"
3. Install the plugin
4. Restart Jenkins

### Step 8: Use in Your Jenkinsfile
Copy the provided Jenkinsfile and use it in your pipeline jobs. Email notifications will be sent on:
- ✓ Success: Deployment completed
- ✗ Failure: Build failed
- ⚠ Unstable: Build completed with warnings

### Troubleshooting
If emails aren't sending:
1. Check Jenkins logs: http://localhost:8080/log/all
2. Verify app password is correct (16 characters without spaces)
3. Ensure 2-Step Verification is enabled on securetodolist1@gmail.com
4. Check Gmail security: https://myaccount.google.com/security
5. Allow "Less secure apps" is not blocking (depends on Gmail settings)

### Your Credentials Summary
- **Email**: securetodolist1@gmail.com
- **SMTP Server**: smtp.gmail.com
- **SMTP Port**: 587
- **App Password**: sweq wftk gzey molk
- **TLS Enabled**: Yes
