const users = [];

const findUserByEmail = (email) => users.find((user) => user.email === email);

const addUser = (user) => users.push(user);

module.exports = { users, findUserByEmail, addUser };