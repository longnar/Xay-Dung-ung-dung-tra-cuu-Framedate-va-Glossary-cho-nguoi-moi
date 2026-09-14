const db = require('../repositories/authRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Admin / User Login
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Query user from database
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const user = rows[0];

        // Compare password hashes
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Check if user has admin role (optional safeguard but highly recommended)
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only administrators are allowed to log in here.' });
        }

        // Create JWT token payload
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        // Sign token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'super_secret_key_for_idol_showdown_wiki',
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        return res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An error occurred during login. Please try again.' });
    }
};

/**
 * User Registration (Helper endpoint)
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Role default is 'guest', can be set to 'admin'
    const userRole = role === 'admin' ? 'admin' : 'guest';

    try {
        // Check if username already exists
        const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Username is already taken.' });
        }

        // Hash password using bcryptjs
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const [result] = await db.execute(
            'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
            [username, hashedPassword, userRole]
        );

        return res.status(201).json({
            message: 'User registered successfully.',
            user: {
                id: result.insertId,
                username,
                role: userRole
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'An error occurred during registration.' });
    }
};
