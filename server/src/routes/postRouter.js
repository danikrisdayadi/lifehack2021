const express = require('express');
const authenticate = require('../utils/config/passport');

const postRouter = express.Router();
postRouter.use(express.json());

const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const replyController = require('../controllers/replyContoller');

postRouter
    .route('/')
    .get(authenticate.verifyUser, postController.getAllPosts)
    .post(authenticate.verifyUser, postController.postPost);

postRouter
    .route('/:postId')
    .get(authenticate.verifyUser, postController.getPost)
    .delete(authenticate.verifyUser, postController.deletePost);

postRouter
    .route('/:postId/comments')
    .get(authenticate.verifyUser, commentController.getPostComments)
    .post(authenticate.verifyUser, commentController.postComment);

postRouter
    .route('/:postId/comments/:commentId')
    .delete(authenticate.verifyUser, commentController.deleteComment);

postRouter
    .route('/:postId/comments/:commentId/replies')
    .get(authenticate.verifyUser, replyController.getCommentReplies)
    .post(authenticate.verifyUser, replyController.postReply);

postRouter
    .route('/:postId/comments/:commentId/replies/:replyId')
    .delete(authenticate.verifyUser, replyController.deleteReply);

module.exports = postRouter;
