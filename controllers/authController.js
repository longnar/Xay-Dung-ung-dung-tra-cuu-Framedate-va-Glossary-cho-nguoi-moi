const authService = require('../server/services/authService');

/**
 * HTTP Controller xử lý đăng nhập
 */
const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        return res.status(200).json({
            message: 'Login successful.',
            ...result
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'An error occurred during login. Please try again.'
        });
    }
};

/**
 * HTTP Controller xử lý đăng ký người dùng
 */
const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);
        return res.status(201).json({
            message: 'User registered successfully.',
            ...result
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'An error occurred during registration.'
        });
    }
};

module.exports = {
    login,
    register
};
