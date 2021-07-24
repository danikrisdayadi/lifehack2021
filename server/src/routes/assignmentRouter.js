const express = require('express');
// const cors = require('cors');
// const corsOptionsDelegate = require('../../node_modules/cors');
const authenticate = require('../utils/config/passport');

const assignmentRouter = express.Router();
assignmentRouter.use(express.json());

const assignmentController = require('../controllers/assignmentController');
const questionController = require('../controllers/questionController');

assignmentRouter
    .route('/')
    .get(authenticate.verifyUser, assignmentController.getAllAssignments)
    .post(authenticate.verifyUser, assignmentController.postAssignment);

assignmentRouter
    .route('/:assignmentId')
    .get(authenticate.verifyUser, assignmentController.getAssignment)
    .put(authenticate.verifyUser, assignmentController.updateAssignment)
    .delete(authenticate.verifyUser, assignmentController.deleteAssignment);

assignmentRouter
    .route('/:assignmentId/questions')
    .post(authenticate.verifyUser, questionController.postQuestion);

assignmentRouter
    .route('/:assignmentId/questions/:questionId')
    .put(authenticate.verifyUser, questionController.updateQuestion)
    .delete(authenticate.verifyUser, questionController.deleteQuestion);

module.exports = assignmentRouter;
