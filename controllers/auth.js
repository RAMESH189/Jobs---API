const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
 
const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError('Provide the email and password')
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('User Invalid');
    }
    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Password Incorrect');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}


module.exports = {
    login,
    register
}