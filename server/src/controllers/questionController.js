const Assignment = require('../models/assignment');
const Question = require('../models/question');
const Classroom = require('../models/classroom');

const questionController = {
    postQuestion(req, res, next) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to post a question!'
            });
        }
        Classroom.findById(req.params.classId)
            .then(
                (c) => {
                    if (
                        c != null &&
                        c.assignments.id(req.params.assignmentId) != null
                    ) {
                        if (c.teacher.id.equals(req.user._id)) {
                            let assignment = c.assignments.id(
                                req.params.assignmentId
                            );
                            assignment.questions.push(req.body);
                            c.save().then((c) => {
                                assignment = c.assignments.id(
                                    req.params.assignmentId
                                );
                                res.statusCode = 200;
                                res.setHeader(
                                    'Content-Type',
                                    'application/json'
                                );
                                res.json(assignment.questions);
                            });
                        } else {
                            err = new Error(
                                'You are not authorized to post a question for this assignment!'
                            );
                            err.status = 403;
                            return next(err);
                        }
                    } else {
                        err = new Error(
                            'Post ' + req.params.postId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    },

    updateQuestion(req, res, next) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to update a question!'
            });
        }
        Classroom.findById(req.params.classId)
            .then(
                (c) => {
                    if (
                        c != null &&
                        c.assignments.id(req.params.assignmentId) != null &&
                        c.assignments
                            .id(req.params.assignmentId)
                            .questions.id(req.params.questionId) != null
                    ) {
                        if (c.teacher.id.equals(req.user._id)) {
                            let question = c.assignments
                                .id(req.params.assignmentId)
                                .questions.id(req.params.questionId);
                            if (req.body.content) {
                                question.content = req.body.content;
                            }
                            if (req.body.image) {
                                question.image = req.body.image;
                            }
                            if (req.body.answer) {
                                question.answer = req.body.answer;
                            }
                            if (req.body.options) {
                                question.options = req.body.options;
                            }
                            c.save().then((c) => {
                                let assignment = c.assignments.id(
                                    req.params.assignmentId
                                );
                                res.statusCode = 200;
                                res.setHeader(
                                    'Content-Type',
                                    'application/json'
                                );
                                res.json(assignment.questions);
                            });
                        } else {
                            err = new Error(
                                'You are not authorized to update this question!'
                            );
                            err.status = 403;
                            return next(err);
                        }
                    } else {
                        err = new Error(
                            'Classroom ' +
                                req.params.classId +
                                ' or assignment ' +
                                req.params.assignmentId +
                                ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    },

    deleteQuestion(req, res, next) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to delete a question!'
            });
        }
        Classroom.findById(req.params.classId)
            .then(
                (c) => {
                    if (
                        c != null &&
                        c.assignments.id(req.params.assignmentId) != null &&
                        c.assignments
                            .id(req.params.assignmentId)
                            .questions.id(req.params.questionId) != null
                    ) {
                        if (c.teacher.id.equals(req.user._id)) {
                            c.assignments
                                .id(req.params.assignmentId)
                                .questions.id(req.params.questionId)
                                .remove();
                            let assignment = c.assignments.id(
                                req.params.assignmentId
                            );
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(assignment.questions);
                        } else {
                            err = new Error(
                                'You are not authorized to delete this question!'
                            );
                            err.status = 403;
                            return next(err);
                        }
                    } else {
                        err = new Error(
                            'Classroom ' +
                                req.params.classId +
                                ' or assignment ' +
                                req.params.assignmentId +
                                ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    }
};

module.exports = questionController;
