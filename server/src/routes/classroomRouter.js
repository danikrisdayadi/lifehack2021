const express = require('express');

const classroomRouter = express.Router();
classroomRouter.use(express.json());

const classroomController = require('../controllers/classroomController');

classroomRouter.route('/').post(classroomController.postClass);

classroomRouter
    .route('/:classId')
    .get(classroomController.getClass)
    .put(classroomController.updateClass)
    .delete(classroomController.deleteClass);

module.exports = classroomRouter;
