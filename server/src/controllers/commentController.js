const Post = require('../models/post');

const commentController = {
    getPostComments(req, res, next) {
        Post.findById(req.params.postId)
            .then(
                (post) => {
                    if (post != null) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(post.comments);
                    } else {
                        err = new Error(
                            'Post ' + req.params.postId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    },

    postComment(req, res, next) {
        Post.findById(req.params.postId)
            .then(
                (post) => {
                    if (post != null) {
                        post.comments.push(req.body);
                        post.save().then(
                            (post) => {
                                Post.findById(post._id)
                                    .populate('comments')
                                    .then((post) => {
                                        res.statusCode = 200;
                                        res.setHeader(
                                            'Content-Type',
                                            'application/json'
                                        );
                                        res.json(post);
                                    });
                            },
                            (err) => next(err)
                        );
                    } else {
                        err = new Error(
                            'Post ' + req.params.postId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    },

    deleteComment(req, res, next) {
        Post.findById(req.params.postId)
            .then(
                (post) => {
                    if (
                        post != null &&
                        post.comments.id(req.params.commentId) != null
                    ) {
                        if (
                            true
                            //   post.comments.id(req.params.commentId).author.equals(req.user._id)
                        ) {
                            post.comments.id(req.params.commentId).remove();
                            post.save().then(
                                (post) => {
                                    Post.findById(post._id)
                                        .populate('comments')
                                        .then((post) => {
                                            res.statusCode = 200;
                                            res.setHeader(
                                                'Content-Type',
                                                'application/json'
                                            );
                                            res.json(post);
                                        });
                                },
                                (err) => next(err)
                            );
                        } else {
                            err = new Error(
                                'You are not authorized to delete this post!'
                            );
                            err.status = 403;
                            return next(err);
                        }
                    } else if (post == null) {
                        err = new Error(
                            'Post ' + req.params.postId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    } else {
                        err = new Error(
                            'Comment ' + req.params.commentId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    }
};

module.exports = commentController;
