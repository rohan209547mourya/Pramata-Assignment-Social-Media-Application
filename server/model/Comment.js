const mongoose = require('mongoose');
const Joi = require('joi');


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema);


function validateComment(comment) {

    const schema = Joi.object({
        comment: Joi.string().min(1).max(100).required(),
        user: Joi.string().required()
    });

    return schema.validate(comment);
}

module.exports = {
    Comment,
    validateComment
}

