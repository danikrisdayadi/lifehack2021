const Assignment = require('../models/assignment');

const questionController = {
    getAssignmentQuestions(req, res, next) {
        Assignment
        .findById(req.params.assignmentId)
        .then(
        (assignment) => {
          if (assignment != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(assignment.questions);
          } else {
            err = new Error('Assignment ' + req.params.assignmentId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
    },

    getQuestion(req, res, next) {
        Assignment.findById(req.params.assignmentId)
      .then(
        (assignment) => {
          if (assignment != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(assignment.questions);
          } else {
            err = new Error('Dish ' + req.params.assignmentId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
    },

    postQuestion(req, res, next) {
        Assignment.findById(req.params.assignmentId)
      .then(
        (assignment) => {
          if (assignment != null) {
            assignment.questions.push(req.body);
            assignment.save().then(
              (assignment) => {
                Assignment.findById(assignment._id)
                  .populate('questions.author')
                  .then((assignment) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(assignment);
                  });
              },
              (err) => next(err)
            );
          } else {
            err = new Error('Assignment ' + req.params.assignmentId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
    },

    updateQuestion(req, res, next) {
        Assignment.findById(req.params.assignmentId)
      .then(
        (assignment) => {
          if (assignment != null && assignment.questions.id(req.params.questionId) != null) {
            if (true
            //   assignment.author.equals(req.user._id)
            ) {
              if (req.body.content) {
                assignment.questions.id(req.params.questionId).content = req.body.content;
              }
              if (req.body.image) {
                assignment.questions.id(req.params.questionId).image =
                  req.body.image;
              }

              if (req.body.answer) {
                   assignment.questions.id(req.params.questionId).answer =
                  req.body.answer;
              }

              assignment.save().then(
                (assignment) => {
                  Assignment.findById(assignment._id)
                    .populate('questions.author')
                    .then((assignment) => {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json(assignment);
                    });
                },
                (err) => next(err)
              );
            } else {
              err = new Error('You are not authorized to update this question!');
              err.status = 403;
              return next(err);
            }
          } else if (assignment == null) {
            err = new Error('Assignment ' + req.params.assignmentId + ' not found');
            err.status = 404;
            return next(err);
          } else {
            err = new Error('Question ' + req.params.questionId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
    },

    deleteQuestion(req, res, next) {
        Assignment.findById(req.params.assignmentId)
      .then(
        (assignment) => {
          if (assignment != null && assignment.questions.id(req.params.questionId) != null) {
            if (true
            //   assignment.questions.id(req.params.questionId).author.equals(req.user._id)
            ) {
              assignment.questions.id(req.params.questionId).remove();
              assignment.save().then(
                (assignment) => {
                  Assignment.findById(assignment._id)
                    .populate('questions.author')
                    .then((assignment) => {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json(assignment);
                    });
                },
                (err) => next(err)
              );
            } else {
              err = new Error('You are not authorized to delete this question!');
              err.status = 403;
              return next(err);
            }
          } else if (assignment == null) {
            err = new Error('Assignment ' + req.params.assignmentId + ' not found');
            err.status = 404;
            return next(err);
          } else {
            err = new Error('Question ' + req.params.questionId + ' not found');
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
