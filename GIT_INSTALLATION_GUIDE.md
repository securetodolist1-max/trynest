# ⚠️ GIT NOT INSTALLED - INSTALLATION GUIDE

## 🔴 Error: "git is not recognized"

This means **Git is not installed** on your Windows computer.

---

# ✅ SOLUTION: Install Git for Windows

## Step 1: Download Git Installer

Go to: **https://git-scm.com/download/win**

The download starts automatically.

**File name:** `Git-2.x.x-64-bit.exe` (or similar)

## Step 2: Run Installer

1. Find the downloaded file (usually in `Downloads` folder)
2. Double-click it
3. Click **Yes** when Windows asks "Allow this app to make changes?"

## Step 3: Follow Installation Steps

**Welcome Screen:**
- Click **Next**

**Select Destination Location:**
- Keep default: `C:\Program Files\Git`
- Click **Next**

**Select Components:**
- Keep defaults checked
- Click **Next**

**Select Start Menu Folder:**
- Keep default
- Click **Next**

**Choosing the default editor used by Git:**
- Select: **Use Visual Studio Code as Git's default editor**
- Click **Next**

**Adjusting your PATH environment:**
- Select: **Git from the command line and also from 3rd-party software**
- Click **Next**

**Choosing HTTPS transport backend:**
- Keep: **Use the OpenSSL library**
- Click **Next**

**Configuring line ending conversions:**
- Keep: **Checkout Windows-style, commit Unix-style line endings**
- Click **Next**

**Configuring the terminal emulator:**
- Select: **Use Windows' default console window**
- Click **Next**

**Choose the default behavior of 'git pull':**
- Keep: **Default (fast-forward or merge)**
- Click **Next**

**Choose a credential helper:**
- Keep: **Git Credential Manager Core**
- Click **Next**

**Configuring extra options:**
- Keep defaults checked
- Click **Next**

**Configuring experimental options:**
- Keep as is
- Click **Install**

## Step 4: Wait for Installation

Wait for installation to complete (1-2 minutes)

## Step 5: Click Finish

- Uncheck: **View Release Notes**
- Click **Finish**

---

# ✅ VERIFY GIT IS INSTALLED

Open a **NEW** PowerShell/Command Prompt window (important - open a new one!)

Type:
```bash
git --version
```

You should see:
```
git version 2.42.0.windows.1
```

If you see this, Git is installed! ✓

---

# 🚀 NOW RUN YOUR GIT COMMANDS

Open PowerShell in your project folder:

**Method 1: Right-click → Open in Terminal**
1. Open File Explorer
2. Navigate to: `C:\Users\cmark\Desktop\trynest`
3. Right-click in empty space
4. Click **Open in Terminal** or **Open PowerShell window here**

**Method 2: Navigate Manually**
```bash
cd C:\Users\cmark\Desktop\trynest
```

**Now run:**
```bash
git clone https://github.com/securetodolist1-max/secure-todo-app.git
cd secure-todo-app
```

---

# ✅ WHAT TO EXPECT

After running `git clone`:

You'll see:
```
Cloning into 'secure-todo-app'...
remote: Enumerating objects: 7, done.
remote: Counting objects: 100% (7/7), done.
remote: Compressing objects: 100% (5/5), done.
Receiving objects: 100% (7/5), 1.23 KiB | 1.23 MiB/s, done.
```

Then:
```
secure-todo-app/
├── README.md
├── .gitignore
└── .git
```

✅ Repository cloned successfully!

---

# 📋 NEXT STEPS (After Git Installation)

```bash
# 1. Navigate to folder
cd secure-todo-app

# 2. Add project files here (copy these 6 files):
#    - Jenkinsfile
#    - Dockerfile
#    - docker-compose.yml
#    - package.json
#    - server.js
#    - .env.example

# 3. Check status
git status

# 4. Stage files
git add .

# 5. Commit
git commit -m "feat: Add CI/CD pipeline"

# 6. Push to GitHub
git push origin main
```

---

# 🆘 TROUBLESHOOTING

## Still getting "git is not recognized"?

**Solution:**
1. **Close PowerShell completely**
2. **Open a NEW PowerShell window**
3. Try again

(This is because PowerShell caches program paths)

## Installation was corrupted?

**Solution:**
1. Go to: **Control Panel** → **Programs** → **Programs and Features**
2. Find: **Git**
3. Click **Uninstall**
4. Download and install again
5. Restart computer

## Want to verify installation path?

```bash
where git
```

Should show:
```
C:\Program Files\Git\cmd\git.exe
```

---

# ✅ YOU'RE READY!

After installing Git:

```bash
git clone https://github.com/securetodolist1-max/secure-todo-app.git
cd secure-todo-app
# Add your 6 project files
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

**Jenkins will auto-deploy!** 🚀

---

# 📞 SUPPORT

**Git Website:** https://git-scm.com
**Git Documentation:** https://git-scm.com/doc
**Installation Issues:** https://git-scm.com/download/win

---

## Next, let me know when Git is installed and we'll continue! ✓
