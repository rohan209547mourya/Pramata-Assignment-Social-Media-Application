const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../model/User');
const bcrypt = require('bcrypt');

// Register new user route
router.post('/register', async (req, res, next) => {

    const { error } = validateUser(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            status: 400
        });
    }


    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({
            message: 'User already registered',
            status: 400
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            status: 500
        });
    }

    res.status(200).json({
        message: 'User registered successfully',
        status: 200
    });
});


// Login user route
router.post('/login', async (req, res, next) => {


    console.log(req);

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({
            message: 'User not found',
            status: 400
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            message: 'Invalid password',
            status: 400
        });
    }

    const token = user.generateAuthToken();

    const responseObj = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    res.status(200).json({
        message: 'Login successful',
        status: 200,
        data: {
            token: token,
            user: responseObj
        }   
    });
});


module.exports = router;
