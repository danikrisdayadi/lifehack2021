const Post = require('../models/post');

const replyController = {
    getCommentReplies(req, res, next) {
        Post.findById(req.params.postId)
            .then(
                (post) => {
                    if (post != null) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(
                            post.comments.id(req.params.commentId).replies
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

    postReply(req, res, next) {
        Post.findById(req.params.postId)
            .then(
                (post) => {
                    if (
                        post != null &&
                        post.comments.id(req.params.commentId) != null
                    ) {
                        let comment = post.comments.id(req.params.commentId);
                        comment.replies.push(req.body);
                        post.save().then((post) => {
                            comment = post.comments.id(req.params.commentId);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(comment.replies);
                        });
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

    deleteReply(req, res, next) {
        Post.findById(req.params.postId)
            .then(
                (post) => {
                    if (
                        post != null &&
                        post.comments.id(req.params.commentId) != null &&
                        post.comments
                            .id(req.params.commentId)
                            .replies.id(req.params.replyId) != null
                    ) {
                        post.comments
                            .id(req.params.commentId)
                            .replies.id(req.params.replyId)
                            .remove();
                        post.save().then((post) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(post);
                        });
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
    }
};

module.exports = replyController;
