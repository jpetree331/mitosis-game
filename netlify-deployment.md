# Railway + Netlify Deployment Guide

## 🚀 **Architecture Overview**

### **Railway (Backend)**
- **Node.js/Express server** with Turso database
- **API endpoints** for student login, game attempts, admin data
- **Database management** and data persistence
- **Admin dashboard** backend logic

### **Netlify (Frontend)**
- **Static HTML/CSS/JavaScript** files
- **Fast global CDN** delivery
- **Automatic deployments** from GitHub
- **Free hosting** for static content

## 🔧 **Step 1: Deploy Backend to Railway**

### **1.1 Set up Turso Database**
```bash
# Install Turso CLI
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

### **1.2 Deploy to Railway**
1. **Go to Railway.app** and sign in
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**: `jpetree331/mitosis-game`
5. **Railway will auto-detect** Node.js project
6. **Add environment variables**:
   - `TURSO_DATABASE_URL`: Your Turso database URL
   - `TURSO_AUTH_TOKEN`: Your Turso auth token
7. **Deploy!** Railway will give you a URL like: `https://your-app.railway.app`

## 🔧 **Step 2: Deploy Frontend to Netlify**

### **2.1 Update Frontend Configuration**
1. **Edit** `netlify-frontend/index.html`
2. **Update line 248** with your Railway URL:
   ```javascript
   const API_BASE_URL = 'https://your-railway-app.railway.app';
   ```

### **2.2 Deploy to Netlify**
1. **Go to Netlify.com** and sign in
2. **Click "New site from Git"**
3. **Connect GitHub** and select your repository
4. **Build settings**:
   - **Base directory**: `netlify-frontend`
   - **Publish directory**: `netlify-frontend`
   - **Build command**: Leave empty (no build needed)
5. **Deploy!** Netlify will give you a URL like: `https://your-app.netlify.app`

## 🔧 **Step 3: Update GitHub Repository**

### **3.1 Add Netlify Frontend to Repository**
```bash
# Add the netlify-frontend folder to your repository
git add netlify-frontend/
git commit -m "Add Netlify frontend configuration"
git push origin master
```

### **3.2 Create Netlify Configuration**
Create `netlify-frontend/_redirects` file:
```
/*    /index.html   200
```

## 🎯 **Final Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Netlify       │    │   Railway       │    │   Turso         │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│                 │    │                 │    │                 │
│ • Static files  │    │ • Node.js API   │    │ • Student data  │
│ • Fast CDN      │    │ • Express       │    │ • Game attempts │
│ • Auto deploy   │    │ • Database      │    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 **Benefits of This Setup**

### **Netlify Frontend:**
- ✅ **Faster loading** worldwide (CDN)
- ✅ **Free hosting** for static files
- ✅ **Automatic deployments** from GitHub
- ✅ **HTTPS** and custom domains
- ✅ **No server maintenance**

### **Railway Backend:**
- ✅ **Database integration** with Turso
- ✅ **API endpoints** for game data
- ✅ **Student tracking** and analytics
- ✅ **Admin dashboard** backend
- ✅ **Automatic scaling**

## 🔧 **Configuration Files**

### **Railway Configuration** (`railway.json`)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **Netlify Configuration** (`netlify-frontend/_redirects`)
```
/*    /index.html   200
```

## 📊 **Environment Variables**

### **Railway (Backend)**
- `TURSO_DATABASE_URL`: Your Turso database URL
- `TURSO_AUTH_TOKEN`: Your Turso auth token
- `PORT`: 3000 (Railway sets this automatically)

### **Netlify (Frontend)**
- No environment variables needed (static site)

## 🎯 **Deployment Checklist**

- [ ] **Turso database** created and configured
- [ ] **Railway backend** deployed with environment variables
- [ ] **Frontend updated** with Railway API URL
- [ ] **Netlify frontend** deployed
- [ ] **GitHub repository** updated with netlify-frontend
- [ ] **Test full application** end-to-end
- [ ] **Verify admin dashboard** works
- [ ] **Test student login** and game tracking

## 🔍 **Testing Your Deployment**

1. **Visit your Netlify URL** (frontend)
2. **Login as a student** (First Name + Teacher Name)
3. **Play the game** and check answers
4. **Access admin dashboard** (code: `biologyresearchcentral`)
5. **Verify data** is being saved to Turso database

## 🚀 **Custom Domains (Optional)**

### **Netlify Custom Domain**
1. **Go to Netlify dashboard**
2. **Domain settings** → **Add custom domain**
3. **Configure DNS** with your domain provider

### **Railway Custom Domain**
1. **Go to Railway dashboard**
2. **Settings** → **Domains**
3. **Add custom domain**

This setup gives you the best of both worlds: fast static hosting with powerful backend capabilities!


