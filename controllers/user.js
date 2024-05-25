const User = require('../models/user');
const bcrypt = require('bcrypt');

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
    } catch {
        next(err);
    }
};