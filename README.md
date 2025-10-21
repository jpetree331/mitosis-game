# Mitosis Matching Game with Database Tracking

An interactive educational game to help students learn the phases of mitosis by matching descriptions to the correct phases. Now with **Turso database integration** for tracking student progress and teacher analytics.

## 🎮 How to Play

1. **Login** with your First Name and Teacher Name
2. **Drag and drop** each description from the right column to the correct phase on the left
3. **Click "Check Answers"** to see your score and save your attempt
4. **Correct answers** will turn green and stay in place
5. **Incorrect answers** will shake and return to the pool
6. **Click "Reset Game"** to start over with shuffled descriptions

## 🧬 Phases Covered

- **Prophase**: Chromosomes become visible, nuclear membrane breaks down, spindle fibers form
- **Metaphase**: Chromosomes line up at the cell's equator, spindle fibers attach
- **Anaphase**: Sister chromatids are pulled apart to opposite sides
- **Telophase**: New nuclei form, chromosomes uncoil, nuclear membrane reappears
- **Cytokinesis**: Cytoplasm divides, forming two daughter cells

## ✨ New Features

### 🔐 Student Login System
- **First Name** and **Teacher Name** required
- Automatic student creation and tracking
- Persistent progress across sessions

### 📊 Teacher Analytics Dashboard
- **Admin Code**: `biologyresearchcentral`
- **View all students** grouped by teacher
- **Track attempts** and scores per student
- **See specific incorrect answers** for each attempt
- **Export-ready data** for further analysis

### 💾 Database Integration
- **Turso SQLite** database for reliability
- **Automatic data persistence** of all game attempts
- **Detailed tracking** of correct/incorrect answers
- **Teacher-based organization** of student data

## 🚀 Quick Start

### Option 1: Local Development
```bash
# Install dependencies
npm install

# Set up Turso database (see setup-turso.md)
# Configure .env file with your Turso credentials

# Start the server
npm start

# Access at http://localhost:3000
```

### Option 2: Deploy to Netlify
1. **Push to GitHub** repository
2. **Connect to Netlify** with Git integration
3. **Set build command**: `npm install && npm run build` (if needed)
4. **Set publish directory**: `public`
5. **Add environment variables** in Netlify dashboard

## 🛠 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: Turso (SQLite-compatible)
- **Deployment**: Netlify-ready
- **Features**: Drag & drop, responsive design, real-time analytics

## 📈 Analytics Features

- **Student Progress Tracking**: Every attempt saved with detailed results
- **Teacher Dashboard**: Comprehensive view of all student data
- **Performance Metrics**: Success rates, common mistakes, improvement trends
- **Data Export**: JSON-structured data for further analysis

## 🔧 Setup Instructions

See `setup-turso.md` for detailed Turso database configuration.

## 🎯 Educational Benefits

- **Individual Progress**: Students can track their own improvement
- **Teacher Insights**: Identify common misconceptions and learning gaps
- **Adaptive Learning**: Teachers can provide targeted support
- **Data-Driven**: Evidence-based approach to biology education
