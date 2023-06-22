const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');



exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });
exports.findbyId = (userId) => User.findById(userId);


exports.register = async (email,firstName,lastName, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch!');
    }

    //TODO: Check if user exists
    // const existingUser = await this.findByUsername(username);
    const existingUser = await User.findOne({
        $or: [
            { email },
            { firstName },
            { lastName }
        ]
    });

    if (existingUser) {
        throw new Error('This username alredy exists!');
    }
    //TODO: Validate password

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ email, firstName, lastName, password: hashedPassword });

    return this.login(email, password);
}
 

exports.login = async (email, password) => {
    // User exists
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    // Password is valid
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    // Generate token
    const payload = {
        _id: user._id,
        email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
}