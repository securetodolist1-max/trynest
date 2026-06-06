# 💻 WHERE TO RUN GIT COMMANDS

## 🪟 Windows Users

### Option 1: Command Prompt (CMD)

**Step 1: Open Command Prompt**
- Press: `Windows Key + R`
- Type: `cmd`
- Press: Enter

**Step 2: Navigate to your projects folder**
```bash
cd C:\Users\YourName\Desktop
# or
cd C:\Users\YourName\Documents
# or any folder you want
```

**Step 3: Run the git commands**
```bash
git clone https://github.com/secretodolist1-max/secure-todo-app.git
cd secure-todo-app
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

### Option 2: PowerShell (Newer & Better)

**Step 1: Open PowerShell**
- Press: `Windows Key + X`
- Select: `Windows PowerShell` or `Terminal`
- Or search "PowerShell" in Start menu

**Step 2: Navigate to projects folder**
```bash
cd C:\Users\YourName\Desktop
```

**Step 3: Run the git commands**
```bash
git clone https://github.com/secretodolist1-max/secure-todo-app.git
cd secure-todo-app
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

### Option 3: Visual Studio Code Terminal (EASIEST)

**Step 1: Open VS Code**
- Open Visual Studio Code

**Step 2: Open Terminal**
- Click: `Terminal` menu → `New Terminal`
- Or press: `Ctrl + ~` (backtick key)

**Step 3: Run git commands**
```bash
git clone https://github.com/secretodolist1-max/secure-todo-app.git
cd secure-todo-app
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

---

## 🍎 Mac Users

### Option 1: Terminal

**Step 1: Open Terminal**
- Press: `Command + Space`
- Type: `Terminal`
- Press: Enter

**Step 2: Navigate to projects folder**
```bash
cd ~/Desktop
# or
cd ~/Documents
# or any folder you want
```

**Step 3: Run the git commands**
```bash
git clone https://github.com/secretodolist1-max/secure-todo-app.git
cd secure-todo-app
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

### Option 2: Visual Studio Code (EASIEST)

**Step 1: Open VS Code**
- Open Visual Studio Code

**Step 2: Open Terminal**
- Click: `Terminal` menu → `New Terminal`
- Or press: `Control + ~` (backtick key)

**Step 3: Run git commands**
```bash
git clone https://github.com/secretodolist1-max/secure-todo-app.git
cd secure-todo-app
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

---

## 🐧 Linux Users

### Open Terminal

**Step 1: Open Terminal**
- Press: `Ctrl + Alt + T`
- Or search "Terminal" in applications

**Step 2: Navigate to projects folder**
```bash
cd ~/projects
# or
cd ~/Desktop
```

**Step 3: Run the git commands**
```bash
git clone https://github.com/secretodolist1-max/secure-todo-app.git
cd secure-todo-app
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

---

# 📝 COMPLETE STEP-BY-STEP EXAMPLE (Windows)

## Example: Using Command Prompt

### Step 1: Open Command Prompt
```
Press: Windows Key + R
Type: cmd
Press: Enter
```

You'll see something like:
```
C:\Users\YourName>
```

### Step 2: Go to Desktop or your project folder
```bash
cd Desktop
```

Now you see:
```
C:\Users\YourName\Desktop>
```

### Step 3: Clone the Repository
```bash
git clone https://github.com/secretodolist1-max/secure-todo-app.git
```

**What you'll see:**
```
Cloning into 'secure-todo-app'...
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (4/4), done.
Receiving objects: 100% (5/5), 1.23 KiB | 1.23 MiB/s, done.
```

### Step 4: Enter the Folder
```bash
cd secure-todo-app
```

Now you see:
```
C:\Users\YourName\Desktop\secure-todo-app>
```

### Step 5: List the Files (to verify)
```bash
dir
# or on Mac/Linux:
# ls
```

You should see:
```
README.md
.gitignore
.git (hidden folder)
```

### Step 6: Add Project Files Here

**Now you need to add these 7 files to this folder:**
1. Jenkinsfile
2. Dockerfile
3. docker-compose.yml
4. package.json
5. server.js
6. .env.example
7. (Update .gitignore if needed)

**How to add files:**

**Option A: Copy files manually**
- Open File Explorer
- Go to: `C:\Users\YourName\Desktop\secure-todo-app`
- Copy the 7 files into this folder
- Refresh (F5)

**Option B: Open in VS Code**
```bash
code .
```
- VS Code opens in the folder
- Drag and drop files into VS Code's Explorer panel

### Step 7: Check Git Status
```bash
git status
```

You should see:
```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        Dockerfile
        Jenkinsfile
        docker-compose.yml
        package.json
        server.js
        ...
```

### Step 8: Add All Files
```bash
git add .
```

(No output = success)

### Step 9: Commit Files
```bash
git commit -m "feat: Add CI/CD pipeline"
```

You'll see:
```
[main abc1234] feat: Add CI/CD pipeline
 7 files changed, 500 insertions(+)
 create mode 100644 Dockerfile
 create mode 100644 Jenkinsfile
 ...
```

### Step 10: Push to GitHub
```bash
git push origin main
```

You might be asked for credentials:
```
Username for 'https://github.com': secretodolist1-max
Password for 'https://secretodolist1-max@github.com': [enter your GitHub password or token]
```

After push succeeds, you'll see:
```
Counting objects: 8, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (7/7), 2.50 KiB | 500 Bytes/s, done.
To https://github.com/secretodolist1-max/secure-todo-app.git
   1234567..abcdefg  main -> main
```

✅ **Success! Files are on GitHub!**

---

# 🔍 VERIFY ON GITHUB

After pushing, check your repository:

1. Go to: **https://github.com/secretodolist1-max/secure-todo-app**
2. You should see:
   - README.md
   - Jenkinsfile ✓
   - Dockerfile ✓
   - docker-compose.yml ✓
   - package.json ✓
   - server.js ✓
   - All files listed!

---

# 📋 QUICK REFERENCE

## Common Git Commands in Terminal

```bash
# Check current folder
pwd  # Mac/Linux
cd   # Windows to see current path

# List files
ls   # Mac/Linux
dir  # Windows

# Check git status
git status

# Add files
git add .

# Commit
git commit -m "your message"

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# Create new branch
git checkout -b feature/my-feature

# Switch branch
git checkout main

# View commits
git log --oneline
```

---

# ✅ CHECKLIST

After running all commands:

- [ ] Terminal/Command Prompt open
- [ ] Cloned repository: `git clone ...`
- [ ] Entered folder: `cd secure-todo-app`
- [ ] Added 7 project files to folder
- [ ] Added to git: `git add .`
- [ ] Committed: `git commit -m "..."`
- [ ] Pushed: `git push origin main`
- [ ] Verified on GitHub website
- [ ] All files showing in repository

---

# 🚀 NEXT STEP

Once files are on GitHub:

1. Generate GitHub token (5 min)
2. Setup Jenkins credentials (2 min)
3. Add GitHub webhook (2 min)
4. Create Jenkins job (3 min)
5. Test deployment (1 min)

**Total remaining: ~15 minutes to full automation!**
