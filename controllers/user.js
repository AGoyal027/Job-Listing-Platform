const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res, next) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).send('Please fill all the fields')
        }
        const isUserExist = await User.findOne({ email }) || await User.findOne({ mobile });
        if (isUserExist) {
            return res.status(400).send('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try{
        const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Please fill all the fields');
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
        return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign({userId: user._id}, 'secret', {
        expiresIn: '240h'
    });
    res.json({
        token,
        userId: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    });
    } catch(err){
        next(err);
    }
}

module.exports = { registerUser, loginUser };