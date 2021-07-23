const express = require('express');
const cors = require('cors');
const corsOptionsDelegate = require('../../node_modules/cors');
const asyncHandler = require('express-async-handler');

const router = express.Router();
router.use(express.json());
const assignmentController = require('../controllers/assignmentController');
const questionController = require('../controllers/questionController');

router.get('/', assignmentController.getAllAssignments);
router.get('/:assignmentId', assignmentController.getAssignment);
router.post('/:assignmentId', assignmentController.postAssignment);
router.put('/:assignmentId', assignmentController.updateAssignment);
router.delete('/:assignmentId', assignmentController.deleteAssignment);

router.get(
    '/:assignmentId/questions',
    questionController.getAssignmentQuestions
);
router.get(
    '/:assignmentId/questions/:questionId',
    questionController.getQuestion
);
router.post(
    '/:assignmentId/questions/:questionId',
    questionController.postQuestion
);
router.put(
    '/:assignmentId/questions/:questionId',
    questionController.updateQuestion
);
router.delete(
    '/:assignmentId/questions/:questionId',
    questionController.deleteQuestion
);

module.exports = router;
