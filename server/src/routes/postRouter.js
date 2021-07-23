const express = require('express');

const postRouter = express.Router();
postRouter.use(express.json());

const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const replyController = require('../controllers/replyContoller');

postRouter
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.postPost);

postRouter
    .route('/:postId')
    .get(postController.getPost)
    .delete(postController.deletePost);

postRouter
    .route('/:postId/comments')
    .get(commentController.getPostComments)
    .post(commentController.postComment);

postRouter
    .route('/:postId/comments/:commentId')
    .delete(commentController.deleteComment);

postRouter
    .route('/:postId/comments/:commentId/replies')
    .get(replyController.getCommentReplies)
    .post(replyController.postReply);

postRouter
    .route('/:postId/comments/:commentId/replies/:replyId')
    .delete(replyController.deleteReply);

module.exports = postRouter;
