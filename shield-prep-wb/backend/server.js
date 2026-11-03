const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'super-secret-key-change-in-prod';

app.use(cors());
app.use(bodyParser.json());

// --- Mock Database ---
const users = [
    {
        id: '1',
        phone: '1234567890',
        password: 'password', // In real app, hash this!
        role: 'Teacher',
        name: 'Mr. Tutor',
        deviceId: null,
        isApproved: true
    },
    {
        id: '2',
        phone: '9876543210',
        password: 'studentpass',
        role: 'Student',
        name: 'Student A',
        deviceId: null,
        isApproved: true
    }
];

const content = [
    {
        id: '101',
        title: 'Physics Chapter 1: Electrostatics',
        type: 'PDF',
        url: 'https://example.com/secure-pdf-1', // Mock URL
        subject: 'Physics'
    },
    {
        id: '102',
        title: 'Math: Calculus Integration',
        type: 'Video',
        url: 'https://example.com/secure-video-1',
        subject: 'Math'
    }
];

// --- Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- Auth Routes ---
app.post('/auth/login', (req, res) => {
    const { phone, password, deviceId } = req.body;
    const user = users.find(u => u.phone === phone && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isApproved) {
        return res.status(403).json({ message: 'Account not approved yet.' });
    }

    // Device Lock Check
    if (user.role === 'Student') {
        if (user.deviceId && user.deviceId !== deviceId) {
            return res.status(403).json({ message: 'Login failed. This account is locked to another device.' });
        }
        if (!user.deviceId) {
            user.deviceId = deviceId; // Lock to this device
        }
    }

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name, phone: user.phone }, SECRET_KEY);
    res.json({ token, role: user.role, name: user.name });
});

app.post('/auth/register', (req, res) => {
    const { phone, password, name, deviceId } = req.body;
    if (!phone || !password || !name) {
        return res.status(400).json({ message: 'phone, password and name are required' });
    }
    if (users.find(u => u.phone === phone)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: uuidv4(),
        phone,
        password,
        role: 'Student', // Default to student
        name,
        deviceId: deviceId || null,
        isApproved: false // Requires teacher approval
    };
    users.push(newUser);
    res.json({ message: 'Registration successful. Waiting for approval.' });
});

// --- Content Routes (Student) ---
app.get('/content', authenticateToken, (req, res) => {
    if (req.user.role !== 'Student') return res.sendStatus(403);
    res.json(content);
});

// --- Admin Routes (Teacher) ---
app.get('/admin/users', authenticateToken, (req, res) => {
    if (req.user.role !== 'Teacher') return res.sendStatus(403);
    res.json(users.map(({ password, ...safeUser }) => safeUser));
});

app.post('/admin/approve', authenticateToken, (req, res) => {
    if (req.user.role !== 'Teacher') return res.sendStatus(403);
    const { userId, approve } = req.body;
    const user = users.find(u => u.id === userId);
    if (user) {
        user.isApproved = approve;
        res.json({ message: `User ${approve ? 'approved' : 'banned'}` });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/admin/content', authenticateToken, (req, res) => {
    if (req.user.role !== 'Teacher') return res.sendStatus(403);
    const { title, type, url, subject } = req.body;
    const newContent = {
        id: uuidv4(),
        title,
        type,
        url,
        subject
    };
    content.push(newContent);
    res.json({ message: 'Content added', content: newContent });
});

// --- AI Study Buddy Mock ---
app.post('/ai/chat', authenticateToken, (req, res) => {
    const { message, subject } = req.body;
    // In a real app, call Gemini API here
    const reply = `[AI Reply for ${subject}]: I can help you understand "${message}". Ideally I would explain Integration or Electrostatics here based on the WBCHSE syllabus.`;
    res.json({ reply });
});

// --- Mock Progress Tracker ---
app.get('/student/progress', authenticateToken, (req, res) => {
    // Mock data for graphs
    const data = {
        mockTests: [
            { testName: 'Mock 1', score: 85, avg: 70 },
            { testName: 'Mock 2', score: 90, avg: 72 },
            { testName: 'Mock 3', score: 88, avg: 75 }
        ]
    };
    res.json(data);
});

// Serve the dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
