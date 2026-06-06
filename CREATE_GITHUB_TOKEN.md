# ✅ CREATE GITHUB TOKEN - STEP BY STEP

## You're on the Right Page!

This is: **New fine-grained personal access token**

---

## 📝 STEP 1: Fill Token Name

**Token name field:**
```
jenkins-deployment
```

**Description field (optional):**
```
Token for Jenkins CI/CD deployment and GitHub webhook
```

---

## 📝 STEP 2: Set Expiration

**Expiration:**
- Click dropdown: **30 days (Jul 06, 2026)**
- Keep as is (or select 90 days if you want longer)

---

## 📝 STEP 3: Resource Owner

**Resource owner:**
- Already selected: **securetodolist1-max** ✓
- Keep this

---

## 📝 STEP 4: Repository Access

**Repository access:**
- Select: **All repositories** (second option)
- This allows token to work with your repositories

---

## 📝 STEP 5: Permissions

You need to add permissions. Click **+ Add permissions**

### Add These Permissions:

Click **+ Add permissions** and add:

**1. Repository permissions:**
- `contents` → Read and write
- `webhooks` → Read and write
- `actions` → Read and write

**2. Account permissions:**
- Leave as is (or just read)

---

## 🎯 STEP 6: Generate Token

After filling everything:

1. Click **Generate token** button (bottom)
2. GitHub shows your token (40 character string)
3. **COPY THE TOKEN** immediately (you won't see it again!)

**⚠️ IMPORTANT: Save it somewhere safe!**

---

## 💾 Where to Save Token:

Create a text file on your desktop:

**File: `github-token.txt`**

```
Token: [paste your 40-character token here]
Repository: https://github.com/securetodolist1-max/secure-todo-app
Purpose: Jenkins webhook authentication
Created: Today's date
```

---

## ✅ After Token is Created

You'll use it for:

1. **Jenkins Credentials** (we'll do next)
2. **Git Push Authentication** (for pushing code)

---

## 🚀 NEXT STEPS

After creating and copying token:

1. Go back to PowerShell
2. Push your files:
   ```bash
   git push origin main
   ```
3. When asked for password, paste the token

4. Then setup Jenkins with this token

---

**Create the token and save it now!** ✓
