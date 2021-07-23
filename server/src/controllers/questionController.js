const Assignment = require('../models/assignment');
const Question = require('../models/question');
const Class = require('../models/class');

const questionController = {
    postQuestion(req, res, next) {
        Class.findById(req.params.classId)
            .then(
                (c) => {
                    if (
                        c != null &&
                        c.assignments.id(req.params.assignmentId) != null
                    ) {
                        let assignment = c.assignments.id(
                            req.params.assignmentId
                        );
                        assignment.questions.push(req.body);
                        c.save().then((c) => {
                            assignment = c.assignments.id(
                                req.params.assignmentId
                            );
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(assignment.questions);
                        });
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
        Class.findById(req.params.classId)
            .then(
                (c) => {
                    if (
                        c != null &&
                        c.assignments.id(req.params.assignmentId) != null &&
                        c.assignments
                            .id(req.params.assignmentId)
                            .questions.id(req.params.questionId) != null
                    ) {
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
                            res.setHeader('Content-Type', 'application/json');
                            res.json(assignment.questions);
                        });
                    } else {
                        err = new Error(
                            'Class ' +
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
        Class.findById(req.params.classId)
            .then(
                (c) => {
                    if (
                        c != null &&
                        c.assignments.id(req.params.assignmentId) != null &&
                        c.assignments
                            .id(req.params.assignmentId)
                            .questions.id(req.params.questionId) != null
                    ) {
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
                            'Class ' +
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
