const express = require('express');
const router = express.Router();

const { User } = require('../model/User');
const { Post } = require('../model/Post');
const { validateComment, Comment } = require('../model/Comment'); 
const authorize = require('../middleware/authorization');



// get all posts
router.get('/',authorize(['admin', 'user']) ,async (req, res, next) => {
    try {
        const posts = await Post.find().populate('user', 'name');
        res.json(posts);
    } catch (error) {
        next(error);
    }
});


// create new post
router.post('/',authorize(['admin', 'user']), async (req, res, next) => {

    const post = new Post({
        description: req.body.description,
        image: req.body.image,
        user: req.user._id
    });

    try {
        await post.save();
    } catch (error) {
        next(error);
    }

    res.json({
        message: 'Post created successfully',
        status: 200,
        data: post
    });
});



// delete post
router.delete('/:id',authorize(['admin', 'user']), async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Post deleted successfully',
            status: 200,
            data: post
        });
    } catch (error) {
        next(error);
    }
});


// like post
router.post('/like/:id',authorize(['admin', 'user']), async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.user._id)) {
            post.likes.push(req.user._id);
            await post.save();
        }

        res.json({
            message: 'Post liked successfully',
            status: 200,
            data: post
        });
    } catch (error) {
        next(error);
    }
});


// comment on post
router.post('/comment/:id',authorize(['admin', 'user']), async (req, res, next) => {

    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: 'Post not found',
            status: 404
        });
    }


    const comment = new Comment({
        comment: req.body.description,
        user: req.user._id,
    });

    try {
        await comment.save();
        post.comments.push(comment);
        await post.save();
    } catch (error) {
        next(error);
    }

    res.json({
        message: 'Comment created successfully',
        status: 200,
        data: comment
    });


});


module.exports = router;