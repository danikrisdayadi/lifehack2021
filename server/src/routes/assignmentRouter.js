const express = require('express');
// const cors = require('cors');
// const corsOptionsDelegate = require('../../node_modules/cors');

const assignmentRouter = express.Router();
assignmentRouter.use(express.json());

const assignmentController = require('../controllers/assignmentController');
const questionController = require('../controllers/questionController');

assignmentRouter
    .route('/')
    .get(assignmentController.getAllAssignments)
    .post(assignmentController.postAssignment);

assignmentRouter
    .route('/:assignmentId')
    .get(assignmentController.getAssignment)
    .put(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

assignmentRouter
    .route('/:assignmentId/questions')
    .post(questionController.postQuestion);

assignmentRouter
    .route('/:assignmentId/questions/:questionId')
    .put(questionController.updateQuestion)
    .delete(questionController.deleteQuestion);

module.exports = assignmentRouter;
