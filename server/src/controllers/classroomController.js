const express = require('express');

const Classroom = require('../models/classroom');

const classroomController = {
    getClass(req, res, next) {
        Classroom.findById(req.params.classId)
            .then((c) => {
                if (classController != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(c);
                } else {
                    let err = new Error(
                        'Class ' + req.params.classId + ' not found!'
                    );
                    res.statusCode = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    },

    postClass(req, res) {
        if (!req.body.subject) {
            return res.status(400).send({
                message: 'Subject cannot be empty'
            });
        }

        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to create a class!'
            });
        }

        const c = new Classroom({
            subject: req.body.subject,
            teacher: req.user._id
        });

        c.save()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the Class.'
                });
            });
    },

    updateClass(req, res) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to update a class!'
            });
        }
        Classroom.findByIdAndUpdate(
            req.params.classId,
            {
                $set: req.body
            },
            { new: true }
        )
            .then((c) => {
                if (!c) {
                    return res.status(404).send({
                        message: 'Class not found with id ' + req.params.classId
                    });
                }
                if (c.teacher.id.equals(req.user._id)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(c);
                } else {
                    return res.status(400).send({
                        message: 'You are not authorized to update this class!'
                    });
                }
            })
            .catch((err) => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Please enter the appropriate Object id'
                    });
                }
                return res.status(500).send({
                    message:
                        'Error updating class with id ' + req.params.classId
                });
            });
    },

    deleteClass(req, res, next) {
        if (req.user.userType != 'Teacher') {
            return res.status(400).send({
                message: 'You are not authorized to delete a class!'
            });
        }

        Classroom.findById(req.params.classId)
            .then((c) => {
                if (!c) {
                    return res.status(404).send({
                        message: 'Class not found with id ' + req.params.classId
                    });
                }
                if (c.teacher.id.equals(req.user._id)) {
                    Assignments.deleteMany({ _id: { $in: c.assignments } })
                        .then(() => {
                            Classroom.findByIdAndRemove(
                                req.params.classId
                            ).then(() => {
                                res.statusCode = 200;
                                res.setHeader(
                                    'Content-Type',
                                    'application/json'
                                );
                                res.json('Classroom deleted successfully!');
                            });
                        })
                        .catch((err) => next(err));
                } else {
                    return res.status(400).send({
                        message: 'You are not authorized to delete this class!'
                    });
                }
            })
            .catch((err) => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: 'Class not found with id ' + req.params.classId
                    });
                }
                return res.status(500).send({
                    message:
                        'Could not delete class with id ' + req.params.classId
                });
            });
    }
};

module.exports = classroomController;
