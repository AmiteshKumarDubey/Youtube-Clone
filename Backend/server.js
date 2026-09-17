import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'YouTube Clone API', 
        status: 'running',
        endpoints: ['/api/auth', '/api/videos', '/api/users', '/api/comments']
    });
});


// Use 5002 or any available port
const PORT = 5002;

// Add error handling for port in use
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📺 API available at http://localhost:${PORT}/api/videos`);
});

// Handle port errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy. Trying ${PORT + 1}...`);
        const newPort = PORT + 1;
        server.listen(newPort, '0.0.0.0');
    } else {
        console.error('Server error:', error);
    }
});