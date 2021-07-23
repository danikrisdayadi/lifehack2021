import express from 'express';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';
import asyncHandler from 'express-async-handler';

const postRouter = express.Router();
postRouter.use(express.json());

postRouter
    .route('/posts')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), getAllPosts);

postRouter
    .route('/posts/:postId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getPost))
    .post(cors(corsOptionsDelegate), asyncHandler(postPost))
    .put(cors(corsOptionsDelegate), asyncHandler(updatePost))
    .delete(cors(corsOptionsDelegate), asyncHandler(deletePost));

postRouter
    .route('/posts/:postId/comments')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getPostComments));

postRouter
    .route('/posts/:postId/comments/:commentId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getComment))
    .post(cors(corsOptionsDelegate), asyncHandler(postComment))
    .put(cors(corsOptionsDelegate), asyncHandler(updateComment))
    .delete(cors(corsOptionsDelegate), asyncHandler(deleteComment));

postRouter
    .route('/posts/:postId/comments/:commentId/replies')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getCommentReplies));

postRouter
    .route('/posts/:postId/comments/:commentId/replies/:replyId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getReply))
    .post(cors(corsOptionsDelegate), asyncHandler(postReply))
    .put(cors(corsOptionsDelegate), asyncHandler(updateReply))
    .delete(cors(corsOptionsDelegate), asyncHandler(deleteReply));

export default postRouter;
