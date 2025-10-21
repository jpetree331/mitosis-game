const express = require('express');
const cors = require('cors');
const { createClient } = require('@libsql/client');
require('dotenv').config();

// Fix BigInt serialization
BigInt.prototype.toJSON = function() {
  return Number(this);
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Turso database connection
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

// Initialize database tables
async function initDatabase() {
  try {
    // Create students table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        teacher_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create game_attempts table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS game_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        attempt_number INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        incorrect_answers TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students (id)
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Routes

// Get or create student
app.post('/api/student', async (req, res) => {
  try {
    const { firstName, teacherName } = req.body;
    
    if (!firstName || !teacherName) {
      return res.status(400).json({ error: 'First name and teacher name are required' });
    }

    // Check if student already exists
    const existingStudent = await client.execute({
      sql: 'SELECT * FROM students WHERE first_name = ? AND teacher_name = ?',
      args: [firstName, teacherName]
    });

    if (existingStudent.rows.length > 0) {
      const student = existingStudent.rows[0];
      return res.json({ 
        student: {
          id: Number(student.id),
          first_name: student.first_name,
          teacher_name: student.teacher_name,
          created_at: student.created_at
        },
        isNew: false 
      });
    }

    // Create new student
    const result = await client.execute({
      sql: 'INSERT INTO students (first_name, teacher_name) VALUES (?, ?)',
      args: [firstName, teacherName]
    });

    const newStudent = {
      id: Number(result.lastInsertRowid),
      first_name: firstName,
      teacher_name: teacherName,
      created_at: new Date().toISOString()
    };

    res.json({ 
      student: newStudent,
      isNew: true 
    });
  } catch (error) {
    console.error('Error creating/getting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save game attempt
app.post('/api/game-attempt', async (req, res) => {
  try {
    const { studentId, correctAnswers, incorrectAnswers, totalQuestions } = req.body;

    // Get current attempt number for this student
    const attemptResult = await client.execute({
      sql: 'SELECT COUNT(*) as attempt_count FROM game_attempts WHERE student_id = ?',
      args: [studentId]
    });
    
    const attemptNumber = Number(attemptResult.rows[0].attempt_count || 0) + 1;

    // Save the attempt
    await client.execute({
      sql: `INSERT INTO game_attempts 
            (student_id, attempt_number, total_questions, correct_answers, incorrect_answers) 
            VALUES (?, ?, ?, ?, ?)`,
      args: [studentId, attemptNumber, totalQuestions, correctAnswers, JSON.stringify(incorrectAnswers)]
    });

    res.json({ 
      success: true, 
      attemptNumber,
      message: 'Game attempt saved successfully' 
    });
  } catch (error) {
    console.error('Error saving game attempt:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin dashboard - get all data
app.post('/api/admin/data', async (req, res) => {
  try {
    const { adminCode } = req.body;
    
    if (adminCode !== 'biologyresearchcentral') {
      return res.status(401).json({ error: 'Invalid admin code' });
    }

    // Get all students with their attempts
    const studentsResult = await client.execute(`
      SELECT 
        s.id,
        s.first_name,
        s.teacher_name,
        s.created_at as student_created_at,
        ga.attempt_number,
        ga.total_questions,
        ga.correct_answers,
        ga.incorrect_answers,
        ga.created_at as attempt_created_at
      FROM students s
      LEFT JOIN game_attempts ga ON s.id = ga.student_id
      ORDER BY s.teacher_name, s.first_name, ga.attempt_number
    `);

    // Process the data
    const studentsMap = new Map();
    
    studentsResult.rows.forEach(row => {
      const studentId = Number(row.id);
      
      if (!studentsMap.has(studentId)) {
        studentsMap.set(studentId, {
          id: studentId,
          firstName: row.first_name,
          teacherName: row.teacher_name,
          studentCreatedAt: row.student_created_at,
          attempts: []
        });
      }

      if (row.attempt_number) {
        studentsMap.get(studentId).attempts.push({
          attemptNumber: Number(row.attempt_number),
          totalQuestions: Number(row.total_questions),
          correctAnswers: Number(row.correct_answers),
          incorrectAnswers: JSON.parse(row.incorrect_answers || '[]'),
          attemptCreatedAt: row.attempt_created_at
        });
      }
    });

    const students = Array.from(studentsMap.values());
    
    res.json({ 
      success: true, 
      students,
      totalStudents: students.length,
      totalAttempts: students.reduce((sum, student) => sum + student.attempts.length, 0)
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the main game page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Initialize database and start server
async function startServer() {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Game available at: http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
