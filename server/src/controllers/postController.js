const express = require('express');

const Post = require('../models/post');

const postController = {
    getAllPosts(req, res) {
        try {
            Post.find({}).then((posts) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posts);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getPost(req, res, next) {
        Post.findById(req.params.postId)
            .then((post) => {
                if (postController != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(post);
                } else {
                    let err = new Error(
                        'Post ' + req.params.postId + ' not found!'
                    );
                    res.statusCode = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    },

    postPost(req, res) {
        if (!req.body.title) {
            return res.status(400).send({
                message: 'Title cannot be empty'
            });
        }
        if (!req.body.description) {
            return res.status(400).send({
                message: 'Description cannot be empty'
            });
        }

        const post = new Post({
            title: req.body.title,
            description: req.body.description
            // author: req.user._id
        });

        post.save()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the Post.'
                });
            });
    },

    deletePost(req, res) {
        Post.findByIdAndRemove(req.params.postId)
            .then((post) => {
                if (!post) {
                    return res.status(404).send({
                        message: 'Post not found with id ' + req.params.postId
                    });
                }
                if (post.author.equals(req.user._id)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Post deleted successfully!');
                } else {
                    err = new Error(
                        'You are not authorized to delete this post!'
                    );
                    err.status = 403;
                    return next(err);
                }
            })
            .catch((err) => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: 'Post not found with id ' + req.params.postId
                    });
                }
                return res.status(500).send({
                    message:
                        'Could not delete post with id ' + req.params.postId
                });
            });
    }
};

module.exports = postController;
