# Turso Database Setup Guide

## 1. Install Turso CLI

### Windows (PowerShell)
```powershell
# Download and install Turso CLI
iwr -useb https://get.tur.so/install.ps1 | iex
```

### Alternative (using Scoop)
```powershell
scoop install turso
```

## 2. Create Turso Account and Database

```bash
# Login to Turso
turso auth login

# Create a new database
turso db create mitosis-game-db

# Create auth token for your database
turso db tokens create mitosis-game-db

# Get your database URL
turso db show mitosis-game-db --url
```

## 3. Configure Environment Variables

Create a `.env` file in your project root:

```env
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
PORT=3000
```

## 4. Install Dependencies and Run

```bash
# Install Node.js dependencies
npm install

# Start the server
npm start
```

## 5. Access Your Game

- **Game**: http://localhost:3000
- **Admin Dashboard**: Use the "Data Dashboard" button with code: `biologyresearchcentral`

## Database Schema

The application automatically creates these tables:

### `students` table
- `id` (INTEGER PRIMARY KEY)
- `first_name` (TEXT)
- `teacher_name` (TEXT)
- `created_at` (DATETIME)

### `game_attempts` table
- `id` (INTEGER PRIMARY KEY)
- `student_id` (INTEGER, FOREIGN KEY)
- `attempt_number` (INTEGER)
- `total_questions` (INTEGER)
- `correct_answers` (INTEGER)
- `incorrect_answers` (TEXT, JSON)
- `created_at` (DATETIME)

## Features

✅ **Student Login**: First Name + Teacher Name  
✅ **Game Tracking**: Saves all attempts with detailed results  
✅ **Admin Dashboard**: View all student data by teacher  
✅ **Detailed Analytics**: Shows correct/incorrect answers per attempt  
✅ **Teacher Filtering**: Data organized by teacher name  
✅ **Attempt History**: Complete history of all student attempts  

## Admin Access

- **Admin Code**: `biologyresearchcentral`
- **Access**: Click "Data Dashboard" button on login screen
- **Features**: 
  - View all students grouped by teacher
  - See attempt counts and scores
  - View specific incorrect answers per attempt
  - Export-ready data structure


