# ✅ INITIALIZE TRYNEST AS GIT REPOSITORY

## You're in the Right Folder

```
C:\Users\cmark\Desktop\trynest
```

And it's NOT a Git repository yet.

---

# 🚀 STEP 1: Initialize Git

Run this command:

```bash
git init
```

**Output:**
```
Initialized empty Git repository in C:\Users\cmark\Desktop\trynest\.git
```

---

# 🔗 STEP 2: Add Remote (GitHub)

Before you can push, Git needs to know where to push (GitHub).

First, check if trynest repository exists on GitHub:

Go to: **https://github.com/securetodolist1-max/trynest**

### If trynest repository EXISTS on GitHub:

Run:
```bash
git remote add origin https://github.com/securetodolist1-max/trynest.git
```

### If trynest repository DOESN'T exist on GitHub:

1. Create it: **https://github.com/new**
   - Name: `trynest`
   - Visibility: Public
   - Click "Create repository"

2. Then run:
```bash
git remote add origin https://github.com/securetodolist1-max/trynest.git
```

---

# ✅ STEP 3: Verify Remote is Set

```bash
git remote -v
```

Should show:
```
origin  https://github.com/securetodolist1-max/trynest.git (fetch)
origin  https://github.com/securetodolist1-max/trynest.git (push)
```

---

# 📝 STEP 4: Add the 6 Deployment Files

Create these 6 files in your trynest folder:

1. **Jenkinsfile**
2. **Dockerfile**
3. **docker-compose.yml**
4. **package.json** (or update if exists)
5. **server.js** (or update if exists)
6. **.env.example**

Use file content from: **ADD_PROJECT_FILES.md**

---

# 📤 STEP 5: Stage All Files

```bash
git add .
```

---

# 💾 STEP 6: Commit

```bash
git commit -m "feat: Add CI/CD pipeline with Jenkins, Docker, and deployment automation"
```

---

# 🚀 STEP 7: Set Branch to main

If you're on a different branch, switch to main:

```bash
git branch -M main
```

---

# 📤 STEP 8: Push to GitHub

```bash
git push -u origin main
```

**This might ask for credentials. Use your GitHub token.**

---

# ✅ STEP 9: Verify on GitHub

Go to: **https://github.com/securetodolist1-max/trynest**

You should see all your files + the 6 new deployment files! ✓

---

## 📋 QUICK COMMAND SUMMARY

```bash
# Initialize Git
git init

# Add remote (if trynest exists on GitHub)
git remote add origin https://github.com/securetodolist1-max/trynest.git

# Verify
git remote -v

# Add 6 deployment files to folder

# Stage all
git add .

# Commit
git commit -m "feat: Add CI/CD pipeline"

# Switch to main branch
git branch -M main

# Push
git push -u origin main
```

---

## 🔍 FIRST: Check if trynest exists on GitHub

**Does this URL work?**
```
https://github.com/securetodolist1-max/trynest
```

If yes → It exists ✓
If no (404) → Create it first

**Let me know and we'll continue!**
