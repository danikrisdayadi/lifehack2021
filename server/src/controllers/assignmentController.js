const express = require('express')

const Assignment = require('../models/assignment');

const assignmentController = {
    getAllAssignments(req, res) {
        try {
            Assignment.find({}).then((assignments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(assignments);
            })
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getAssignment(req, res, next) {
        Assignment.findById(req.params.assignmentId).then((assignment) => {
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
        }).catch((err) => next(err));
        
    },

    postAssignment(req, res) {
        if (req.body.questions == 0) {
            return res.status(400).send({
                message: 'Questions cannot be empty'
            });
        }

        const assignment = new Assignment({
            title: req.body.title,
            questions: req.body.questions,
            deadline: req.body.deadline
        });

        assignment
            .save()
            .then((data) => {
                res.send(data);
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
    },

    deleteAssignment(req, res) {
        Assignment.findByIdAndRemove(req.params.assignmentId)
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
                res.json('Assignment deleted successfully!');
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
