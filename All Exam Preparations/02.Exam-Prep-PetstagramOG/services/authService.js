const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');



exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });
exports.getOneByID = (ownerId) => User.findById(ownerId);


exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch!');
    }

    //TODO: Check if user exists
    // const existingUser = await this.findByUsername(username);
    const existingUser = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (existingUser) {
        throw new Error('This username alredy exists!');
    }
    //TODO: Validate password

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ username, email, password: hashedPassword });

    return this.login(username, password);
}


exports.login = async (username, password) => {
    // User exists
    const user = await this.findByUsername(username);

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    // Password is valid
    const isValid = bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    // Generate token
    const payload = {
        _id: user._id,
        email: user.email,
        username,
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
}