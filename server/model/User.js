const mongoose = require('mongoose');
const Joi = require('joi');
const jsonwebtoken = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    profileImage: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});



userSchema.methods.generateAuthToken = function() {
    const token = jsonwebtoken.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role
    }, process.env.JWT_SECRET_KEY || 'secret');

    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {

    const schema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(30).required().email(),
        password: Joi.string().min(8).max(30).required()
    });

    return schema.validate(user);
}

module.exports = {
    User,
    validateUser
}