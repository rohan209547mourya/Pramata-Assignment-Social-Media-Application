const express = require('express');
const router = express.Router();

const { User } = require('../model/User');

const authorize = require('../middleware/authorization');



// get all users
router.get('/getall',authorize(['admin', 'user']) ,async (req, res, next) => {
    
        const users = await User.find();
    
        res.status(200).json({
            message: 'Users fetched successfully',
            status: 200,
            data: users
        });
});


// get user by id
router.get('/:id',authorize(['admin']) ,async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            status: 404
        });
    }

    res.status(200).json({
        message: 'User fetched successfully',
        status: 200,
        data: user
    });
});


module.exports = router;