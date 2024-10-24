const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUser, findUserByEmail } = require('../models/usersModel');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const registerUser = async (name, email, password) => {

    const existingUser = findUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    addUser(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    return { token, user: newUser };
};

module.exports = { registerUser };