const express = require('express');

const Assignment = require('../models/assignment');
const Classroom = require('../models/classroom');

const assignmentController = {
    getClassAssignments(req, res) {
        try {
            Classroom.findById(req.params.classId).then((c) => {
                if (c != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(c.assignments);
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getAssignment(req, res, next) {
        Classroom.findById(req.params.classId)
            .then(
                (c) => {
                    if (
                        c != null &&
                        c.assignments.id(req.params.assignmentId) != null
                    ) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(c.assignments.id(req.params.assignmentId));
                    } else if (c == null) {
                        err = new Error(
                            'Classroom ' + req.params.classId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    } else {
                        err = new Error(
                            'Assignment ' +
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

    postAssignment(req, res, next) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to post an assignment!'
            });
        }
        Classroom.findById(req.params.classId)
            .then(
                (c) => {
                    if (c != null) {
                        if (c.teacher.id.equals(req.user._id)) {
                            c.assignments.push(req.body);
                            c.save().then(
                                (c) => {
                                    Classroom.findById(c._id)
                                        .populate('assignments')
                                        .then((c) => {
                                            res.statusCode = 200;
                                            res.setHeader(
                                                'Content-Type',
                                                'application/json'
                                            );
                                            res.json(c);
                                        });
                                },
                                (err) => next(err)
                            );
                        } else {
                            return res.status(400).send({
                                message:
                                    'You are not authorized to post an assignment to this class!'
                            });
                        }
                    } else {
                        err = new Error(
                            'Classroom ' + req.params.classId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    },

    updateAssignment(req, res, next) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to update an assignment!'
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
                            if (req.body.title) {
                                assignment.title = req.body.title;
                            }
                            if (req.body.mark) {
                                assignment.mark = req.body.mark;
                            }
                            if (req.body.deadline) {
                                assignment.deadline = req.body.deadline;
                            }
                            if (req.body.status) {
                                assignment.status = req.body.status;
                            }
                            if (req.body.questions) {
                                assignment.questions = req.body.questions;
                            }
                            c.save().then(
                                (c) => {
                                    Classroom.findById(c._id)
                                        .populate('assignments')
                                        .then((c) => {
                                            res.statusCode = 200;
                                            res.setHeader(
                                                'Content-Type',
                                                'application/json'
                                            );
                                            res.json(c);
                                        });
                                },
                                (err) => next(err)
                            );
                        } else {
                            err = new Error(
                                'You are not authorized to update this assignment!'
                            );
                            err.status = 403;
                            return next(err);
                        }
                    } else if (c == null) {
                        err = new Error(
                            'Classroom ' + req.params.postId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    } else {
                        err = new Error(
                            'Assignment ' + req.params.commentId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    },

    deleteAssignment(req, res, next) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to delete an assignment!'
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
                            c.assignments.id(req.params.assignmentId).remove();
                            c.save().then(
                                (c) => {
                                    Classroom.findById(c._id)
                                        .populate('assignments')
                                        .then((c) => {
                                            res.statusCode = 200;
                                            res.setHeader(
                                                'Content-Type',
                                                'application/json'
                                            );
                                            res.json(c);
                                        });
                                },
                                (err) => next(err)
                            );
                        } else {
                            err = new Error(
                                'You are not authorized to delete this class!'
                            );
                            err.status = 403;
                            return next(err);
                        }
                    } else if (post == null) {
                        err = new Error(
                            'Classroom ' + req.params.postId + ' not found'
                        );
                        err.status = 404;
                        return next(err);
                    } else {
                        err = new Error(
                            'Assignment ' + req.params.commentId + ' not found'
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

module.exports = assignmentController;
