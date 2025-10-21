# Railway Deployment Guide

## 🚀 Deploying to Railway

## Prerequisites
1. **Railway account** (sign up at railway.app)
2. **Turso database** set up (see setup-turso.md)
3. **GitHub repository** with your code

## Step 1: Set up Turso Database

```bash
# Install Turso CLI
# Windows PowerShell:
iwr -useb https://get.tur.so/install.ps1 | iex

# Login to Turso
turso auth login

# Create database
turso db create mitosis-game-db

# Create auth token
turso db tokens create mitosis-game-db

# Get database URL
turso db show mitosis-game-db --url
```

## Step 2: Deploy to Railway

### Option A: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Set environment variables
railway variables set TURSO_DATABASE_URL="your-turso-url"
railway variables set TURSO_AUTH_TOKEN="your-auth-token"
railway variables set PORT="3000"

# Deploy
railway up
```

### Option B: Railway Dashboard
1. **Connect GitHub** repository to Railway
2. **Add environment variables**:
   - `TURSO_DATABASE_URL`: Your Turso database URL
   - `TURSO_AUTH_TOKEN`: Your Turso auth token
   - `PORT`: 3000 (Railway will override this)
3. **Deploy automatically** on git push

## Step 3: Configure Environment Variables

In Railway dashboard, add these variables:

```
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
NODE_ENV=production
```

## Step 4: Access Your Application

- **Frontend**: Your Railway app URL (e.g., `https://your-app.railway.app`)
- **Admin Dashboard**: Use "Data Dashboard" button with code `biologyresearchcentral`

## 🎯 Railway Benefits for This Project

✅ **Automatic deployments** from GitHub  
✅ **Environment variable management**  
✅ **Built-in HTTPS** and custom domains  
✅ **Automatic scaling** based on traffic  
✅ **Zero-config** Node.js deployment  
✅ **Persistent storage** with Turso integration  

## 🔧 Railway Configuration

The project includes:
- `railway.json` - Railway configuration
- `package.json` - Node.js dependencies
- `server.js` - Express server with Turso integration
- `public/` - Static frontend files

## 📊 Database Schema (Auto-created)

```sql
-- Students table
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Game attempts table  
CREATE TABLE game_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  attempt_number INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  incorrect_answers TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students (id)
);
```

## 🚀 Deployment Checklist

- [ ] Turso database created and configured
- [ ] Environment variables set in Railway
- [ ] Code pushed to GitHub
- [ ] Railway project connected to GitHub repo
- [ ] Deployment successful
- [ ] Test login and admin dashboard
- [ ] Verify database connectivity

## 🔍 Troubleshooting

**Database Connection Issues:**
- Verify Turso credentials in Railway environment variables
- Check Turso database is accessible
- Ensure auth token has proper permissions

**Deployment Issues:**
- Check Railway logs in dashboard
- Verify all dependencies in package.json
- Ensure PORT environment variable is set

**Frontend Issues:**
- Verify public/ directory structure
- Check static file serving in server.js
- Test all routes and API endpoints
