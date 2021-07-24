const express = require('express');

const Assignment = require('../models/assignment');
const Classroom = require('../models/classroom');

const assignmentController = {
    getAllAssignments(req, res) {
        try {
            Assignment.find({}).then((assignments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(assignments);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getAssignment(req, res, next) {
        Assignment.findById(req.params.assignmentId)
            .then((assignment) => {
                if (assignment != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(assignment);
                } else {
                    let err = new Error(
                        'Assignment ' + req.params.assignmentId + ' not found!'
                    );
                    res.statusCode = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    },

    postAssignment(req, res) {
        // if (req.user.userType != 'Teacher') {
        //     return res.status(400).send({
        //         message: 'You are not authorized to post an assignment!'
        //     });
        // }

        Classroom.findById(req.body.classroom)
            .then((classroom) => {
                // if (!classroom) {
                res.statusCode = 404;
                res.send(`Classroom of id : ${req.body.classroom} not found!`);
                return;
                // } else if (!classroom.teacher.id.equals(req.user._id)) {
                //     res.statusCode = 403;
                //     res.send(`You are not authorized to post an assignment!`);
                //     return;
                // }
            })
            .then(() => {
                console.log('asdasd');
                const assignment = new Assignment(req.body);
                console.log(assignment);
                assignment
                    .save()
                    .then((data) => {
                        Classroom.findByIdAndUpdate(req.body.classroom, {
                            $addToSet: { assignments: assignment._id }
                        })
                            .then((c) => {
                                res.statusCode = 200;
                                res.send(data);
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    message:
                                        err.message ||
                                        'Some error occurred while creating the Assignment.'
                                });
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send({
                            message:
                                err.message ||
                                'Some error occurred while creating the Assignment.'
                        });
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the Assignment.'
                });
            });
    },

    updateAssignment(req, res) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to update an assignment!'
            });
        }

        Classroom.findById(req.body.classroom)
            .then((classroom) => {
                if (!classroom) {
                    res.statusCode = 404;
                    res.send(
                        `Organisation of id : ${req.body.organisation} not found!`
                    );
                    return;
                } else if (!c.teacher.id.equals(req.user._id)) {
                    res.statusCode = 403;
                    res.send(`You are not authorized to post an assignment!`);
                    return;
                }
            })
            .then(() => {
                Assignment.findByIdAndUpdate(
                    req.params.assignmentId,
                    {
                        $set: req.body
                    },
                    { new: true }
                )
                    .then((assignment) => {
                        if (!assignment) {
                            return res.status(404).send({
                                message:
                                    'Assignment not found with id ' +
                                    req.params.assignmentId
                            });
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(assignment);
                    })
                    .catch((err) => {
                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message:
                                    'Please enter the appropriate Object id'
                            });
                        }
                        return res.status(500).send({
                            message:
                                'Error updating assignment with id ' +
                                req.params.assignmentId
                        });
                    });
            })
            .catch((err) => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Please enter the appropriate Object id'
                    });
                }
                return res.status(500).send({
                    message:
                        'Error updating assignment with id ' +
                        req.params.assignmentId
                });
            });
    },

    deleteAssignment(req, res) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to delete an assignment!'
            });
        }

        Classroom.findById(req.body.classroom)
            .then((classroom) => {
                if (!classroom) {
                    res.statusCode = 404;
                    res.send(
                        `Organisation of id : ${req.body.organisation} not found!`
                    );
                    return;
                } else if (!c.teacher.id.equals(req.user._id)) {
                    res.statusCode = 403;
                    res.send(`You are not authorized to post an assignment!`);
                    return;
                }
            })
            .then(() => {
                Assignment.findById(req.params.assignmentId)
                    .then((assignment) => {
                        if (!assignment) {
                            return res.status(404).send({
                                message:
                                    'Assignment not found with id ' +
                                    req.params.assignmentId
                            });
                        }

                        Classroom.findByIdAndUpdate(req.body.classroom, {
                            $pullAll: { assignments: [assignment._id] }
                        }).then((resp) => {
                            Assignment.findByIdAndRemove(
                                req.params.assignmentId
                            )
                                .then(() => {
                                    res.statusCode = 200;
                                    res.setHeader(
                                        'Content-Type',
                                        'application/json'
                                    );
                                    res.json(
                                        'Assignment deleted successfully!'
                                    );
                                })
                                .catch((err) => {
                                    if (
                                        err.kind === 'ObjectId' ||
                                        err.name === 'NotFound'
                                    ) {
                                        return res.status(404).send({
                                            message:
                                                'Assignment not found with id ' +
                                                req.params.assignmentId
                                        });
                                    }
                                    return res.status(500).send({
                                        message:
                                            'Could not delete assignment with id ' +
                                            req.params.assignmentId
                                    });
                                });
                        });
                    })
                    .catch((err) => {
                        if (
                            err.kind === 'ObjectId' ||
                            err.name === 'NotFound'
                        ) {
                            return res.status(404).send({
                                message:
                                    'Assignment not found with id ' +
                                    req.params.assignmentId
                            });
                        }
                        return res.status(500).send({
                            message:
                                'Could not delete assignment with id ' +
                                req.params.assignmentId
                        });
                    });
            })
            .catch((err) => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message:
                            'Assignment not found with id ' +
                            req.params.assignmentId
                    });
                }
                return res.status(500).send({
                    message:
                        'Could not delete assignment with id ' +
                        req.params.assignmentId
                });
            });
    }
};

module.exports = assignmentController;
