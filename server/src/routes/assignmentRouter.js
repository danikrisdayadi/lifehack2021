import express from 'express';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';
import asyncHandler from 'express-async-handler';

const assignmentRouter = express.Router();
assignmentRouter.use(express.json());

assignmentRouter
    .route('/assignments')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), getAllAssignments);

assignmentRouter
    .route('/assignments/:assignmentId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getAssignment))
    .post(cors(corsOptionsDelegate), asyncHandler(postAssignment))
    .put(cors(corsOptionsDelegate), asyncHandler(updateAssignment))
    .delete(cors(corsOptionsDelegate), asyncHandler(deleteAssignment));

assignmentRouter
    .route('/assignments/:assignmentId/questions')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getAssignmentQuestions));

assignmentRouter
    .route('/assignments/:assignmentId/questions/:questionId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getQuestion))
    .post(cors(corsOptionsDelegate), asyncHandler(postQuestion))
    .put(cors(corsOptionsDelegate), asyncHandler(updateQuestion))
    .delete(cors(corsOptionsDelegate), asyncHandler(deleteQuestion));

export default assignmentRouter;
