const mongoose = require('mongoose');
const Joi = require('joi');


const postSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });



const Post = mongoose.model('Post', postSchema);


module.exports = {
    Post,
}