# GitHub Setup Guide

## 🚀 Step 1: Install Git

### Option A: Download Git for Windows
1. Go to https://git-scm.com/download/win
2. Download and install Git for Windows
3. Use default settings during installation

### Option B: Install via Package Manager
```powershell
# Using Chocolatey (if installed)
choco install git

# Using Scoop (if installed)
scoop install git

# Using Winget (Windows 10/11)
winget install Git.Git
```

## 🚀 Step 2: Configure Git (First Time Setup)

Open PowerShell or Command Prompt and run:

```bash
# Set your name and email (replace with your GitHub info)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

## 🚀 Step 3: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New repository"** (green button)
3. **Repository name**: `mitosis-game-claude`
4. **Description**: `Interactive mitosis matching game with database tracking`
5. **Make it Public** (or Private if you prefer)
6. **DON'T** initialize with README (we already have files)
7. **Click "Create repository"**

## 🚀 Step 4: Initialize and Push to GitHub

Open PowerShell in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Mitosis game with Turso database integration"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mitosis-game-claude.git

# Push to GitHub
git push -u origin main
```

## 🚀 Step 5: Verify Upload

1. **Go to your GitHub repository**
2. **Check that all files are uploaded**:
   - ✅ `server.js` (Express backend)
   - ✅ `public/index.html` (Frontend with login/admin)
   - ✅ `package.json` (Dependencies)
   - ✅ `railway.json` (Railway config)
   - ✅ `README.md` (Documentation)
   - ✅ `setup-turso.md` (Database setup)
   - ✅ `railway-deployment.md` (Deployment guide)

## 🚀 Step 6: Deploy to Railway

1. **Go to Railway.app** and sign in
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**: `mitosis-game-claude`
5. **Railway will automatically detect** it's a Node.js project
6. **Add environment variables**:
   - `TURSO_DATABASE_URL` (from Turso setup)
   - `TURSO_AUTH_TOKEN` (from Turso setup)
7. **Deploy!**

## 📁 Project Structure

```
mitosis-game-claude/
├── server.js                 # Express backend server
├── public/
│   └── index.html           # Frontend with login/admin features
├── package.json             # Node.js dependencies
├── railway.json            # Railway deployment config
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
├── setup-turso.md          # Turso database setup
├── railway-deployment.md   # Railway deployment guide
└── github-setup.md         # This file
```

## 🎯 What You'll Have After Setup

✅ **GitHub Repository** with all your code  
✅ **Railway Backend** hosting your Node.js server  
✅ **Turso Database** for data persistence  
✅ **Full-Stack Application** with:
- Student login system
- Game with database tracking
- Admin dashboard with analytics
- Teacher-based data organization

## 🔧 Troubleshooting

**Git not found error:**
- Make sure Git is installed and added to PATH
- Restart PowerShell after installation
- Try using Git Bash instead of PowerShell

**Authentication issues:**
- Use GitHub CLI: `gh auth login`
- Or use Personal Access Token for authentication

**Push rejected:**
- Make sure repository exists on GitHub
- Check remote URL: `git remote -v`
- Update remote if needed: `git remote set-url origin NEW_URL`

## 🚀 Next Steps After GitHub Setup

1. **Set up Turso database** (see `setup-turso.md`)
2. **Deploy to Railway** (see `railway-deployment.md`)
3. **Test the application** with database integration
4. **Share with students and teachers!**
