const authRepository = require('../repositories/authRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

/**
 * Business Logic cho Đăng nhập (Admin/User)
 */
const loginUser = async ({ username, password }) => {
    if (!username || !password) {
        throw createError('Username and password are required.', 400);
    }

    const user = await authRepository.findUserByUsername(username);
    if (!user) {
        throw createError('Invalid username or password.', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw createError('Invalid username or password.', 401);
    }

    if (user.role !== 'admin') {
        throw createError('Access denied. Only administrators are allowed to log in here.', 403);
    }

    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || 'super_secret_key_for_idol_showdown_wiki',
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    };
};

/**
 * Business Logic cho Đăng ký người dùng
 */
const registerUser = async ({ username, password, role }) => {
    if (!username || !password) {
        throw createError('Username and password are required.', 400);
    }

    const existingUser = await authRepository.findUserByUsername(username);
    if (existingUser) {
        throw createError('Username is already taken.', 400);
    }

    const userRole = role === 'admin' ? 'admin' : 'guest';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await authRepository.createUser({
        username,
        password_hash: hashedPassword,
        role: userRole
    });

    return {
        user: {
            id: result.insertId,
            username,
            role: userRole
        }
    };
};

module.exports = {
    loginUser,
    registerUser
};
