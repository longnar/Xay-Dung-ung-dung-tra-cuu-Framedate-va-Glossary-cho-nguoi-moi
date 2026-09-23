const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('../routes/authRoutes');
const characterRoutes = require('../routes/characterRoutes');
const glossaryRoutes = require('../routes/glossaryRoutes');
const db = require('../config/database');

function createApp() {
    const app = express();
    const frontendDistPath = path.join(__dirname, '..', 'dist');

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

    app.get('/api', (req, res) => {
        res.status(200).json({
            name: 'Idol Showdown Wiki Backend API',
            version: '1.0.0',
            status: 'Online',
            endpoints: {
                auth: '/api/auth',
                characters: '/api/characters',
                glossaries: '/api/glossaries'
            }
        });
    });

    app.use(express.static(frontendDistPath));

    app.get('/health/db', async (req, res) => {
        try {
            await db.query('SELECT 1');
            return res.status(200).json({ status: 'ok', database: 'connected' });
        } catch (error) {
            console.error('Database health check failed:', error.message);
            return res.status(503).json({ status: 'error', database: 'unavailable' });
        }
    });

    app.use('/api/auth', authRoutes);
    app.use('/api', characterRoutes);
    app.use('/api', glossaryRoutes);

    app.get(/^(?!\/api(?:\/|$)).*/, (req, res, next) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'), (error) => {
            if (error) next(error);
        });
    });

    app.use((req, res) => {
        res.status(404).json({ message: `API Endpoint not found: ${req.method} ${req.originalUrl}` });
    });

    app.use((err, req, res, next) => {
        console.error('Unhandled Error:', err.message);
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File upload failed. Image size exceeds the 5MB limit.' });
        }
        if (err.message && err.message.startsWith('Error: Only images')) {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({
            message: 'An unexpected internal server error occurred.',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    });

    return app;
}

module.exports = createApp;
