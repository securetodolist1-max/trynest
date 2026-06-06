# 🔧 FIX: Git Still Not Recognized

## ❌ Problem

```
'git' is not recognized as an internal or external command
```

## ✅ Solution: Restart Your Computer

Git was just installed, and Windows needs a restart to recognize it globally.

### Step 1: Restart Your Computer

**Windows 11/10:**
- Click **Start** menu
- Click **Power** (bottom left)
- Click **Restart**
- Wait for restart

Or press: `Windows Key + X` → Click **Restart**

### Step 2: After Restart, Open PowerShell Again

- Press: `Windows Key + R`
- Type: `powershell`
- Press: Enter

### Step 3: Verify Git is Working

Type:
```bash
git --version
```

Should show:
```
git version 2.54.0.windows.1
```

If yes, proceed to clone! ✓

---

# 🚀 After Restart: Clone Your Repository

```bash
# Navigate to your folder
cd C:\Users\cmark\Desktop\trynest

# Clone repository
git clone https://github.com/securetodolist1-max/secure-todo-app.git

# Enter folder
cd secure-todo-app

# Check files
dir
```

Expected output:
```
Directory: C:\Users\cmark\Desktop\trynest\secure-todo-app

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           1/15/2024  10:30 AM            50 README.md
-a---           1/15/2024  10:30 AM           200 .gitignore
```

---

# 📋 Troubleshooting If Still Not Working

## Option A: Use Full Path to Git

```bash
"C:\Program Files\Git\cmd\git.exe" clone https://github.com/securetodolist1-max/secure-todo-app.git
```

## Option B: Add Git to PATH Manually

1. Press: `Windows Key + X`
2. Select: **System**
3. Click: **Advanced system settings**
4. Click: **Environment Variables**
5. Under **System variables**, click **Path**
6. Click **New**
7. Type: `C:\Program Files\Git\cmd`
8. Click **OK**
9. Restart PowerShell

## Option C: Use Git Bash Instead

Git installation includes **Git Bash** (terminal specifically for Git):

1. Press: `Windows Key`
2. Search: `Git Bash`
3. Open **Git Bash**
4. Run git commands there

---

# ✅ QUICK FIX SUMMARY

**Just restart your computer!**

After restart:
1. Open PowerShell
2. Type: `git --version` (should work now)
3. Then clone: `git clone https://github.com/securetodolist1-max/secure-todo-app.git`

---

**Try this and let me know!** ✓
