const express = require('express');

const classroomRouter = express.Router();
classroomRouter.use(express.json());

const classroomController = require('../controllers/classroomController');
const assignmentController = require('../controllers/assignmentController');
const questionController = require('../controllers/questionController');

classroomRouter.route('/').post(classroomController.postClass);

classroomRouter
    .route('/:classId')
    .get(classroomController.getClass)
    .put(classroomController.updateClass)
    .delete(classroomController.deleteClass);

classroomRouter
    .route('/:classId/assignments')
    .get(assignmentController.getClassAssignments)
    .post(assignmentController.postAssignment);

classroomRouter
    .route('/:classId/assignments/:assignmentId')
    .get(assignmentController.getAssignment)
    .put(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

classroomRouter
    .route('/:classId/assignments/:assignmentId/questions')
    .post(questionController.postQuestion);

classroomRouter
    .route('/:classId/assignments/:assignmentId/questions/:questionId')
    .put(questionController.updateQuestion)
    .delete(questionController.deleteQuestion);

module.exports = classroomRouter;
