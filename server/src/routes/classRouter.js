const express = require('express');

const classRouter = express.Router();
classRouter.use(express.json());

const classController = require('../controllers/classController');
const assignmentController = require('../controllers/assignmentController');
const questionController = require('../controllers/questionController');

classRouter.route('/').post(classController.postClass);

classRouter
    .route('/:classId')
    .get(classController.getClass)
    .put(classController.updateClass)
    .delete(classController.deleteClass);

classRouter
    .route('/:classId/assignments')
    .get(assignmentController.getClassAssignments)
    .post(assignmentController.postAssignment);

classRouter
    .route('/:classId/assignments/:assignmentId')
    .get(assignmentController.getAssignment)
    .put(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

classRouter
    .route('/:classId/assignments/:assignmentId/questions')
    .post(questionController.postQuestion);

classRouter
    .route('/:classId/assignments/:assignmentId/questions/:questionId')
    .put(questionController.updateQuestion)
    .delete(questionController.deleteQuestion);

module.exports = classRouter;
