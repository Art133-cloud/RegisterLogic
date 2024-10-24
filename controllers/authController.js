const { registerUser } = require('../services/authService');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { token, user } = await registerUser(name, email, password);

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register };