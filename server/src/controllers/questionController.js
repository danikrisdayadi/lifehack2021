const Question = require('../models/question');

const questionController = {
    getAssignmentQuestions(req, res) {
        try {
            Question.find({}).exec((err, questions) => res.json(questions));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getQuestion(req, res) {
        const question = Question.findById(req.params.questionId);
        if (question != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(question);
        } else {
            let err = new Error(
                'Question ' + req.params.questionId + ' not found!'
            );
            res.statusCode = 404;
            return next(err);
        }
    },

    postQuestion(req, res) {
        if (!req.body.asnwer) {
            return res.status(400).send({
                message: 'Answer cannot be empty'
            });
        }

        const question = new Question({
            content: req.body.content,
            image: req.body.image,
            answer: req.body.answer
        });

        question
            .save()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the question.'
                });
            });
    },

    updateQuestion(req, res) {
        Question.findByIdAndUpdate(
            req.params.questionId,
            {
                $set: req.body
            },
            { new: true }
        )
            .then((question) => {
                if (!question) {
                    return res.status(404).send({
                        message:
                            'question not found with id ' +
                            req.params.questionId
                    });
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            })
            .catch((err) => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message:
                            'Question not found with id ' +
                            req.params.questionId
                    });
                }
                return res.status(500).send({
                    message:
                        'Error updating question with id ' +
                        req.params.questionId
                });
            });
    },

    deleteQuestion(req, res) {
        Question.findByIdAndRemove(req.params.questionId)
            .then((question) => {
                if (!question) {
                    return res.status(404).send({
                        message:
                            'Question not found with id ' +
                            req.params.questionId
                    });
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('question deleted successfully!');
            })
            .catch((err) => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message:
                            'Question not found with id ' +
                            req.params.questionId
                    });
                }
                return res.status(500).send({
                    message:
                        'Could not delete question with id ' +
                        req.params.questionId
                });
            });
    }
};

module.exports = questionController;
