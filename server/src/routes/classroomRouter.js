const express = require('express');
const authenticate = require('../utils/config/passport');

const classroomRouter = express.Router();
classroomRouter.use(express.json());

const classroomController = require('../controllers/classroomController');

classroomRouter
    .route('/')
    .post(authenticate.verifyUser, classroomController.postClass);

classroomRouter
    .route('/:classId')
    .get(authenticate.verifyUser, classroomController.getClass)
    .put(authenticate.verifyUser, classroomController.updateClass)
    .delete(authenticate.verifyUser, classroomController.deleteClass);

module.exports = classroomRouter;
