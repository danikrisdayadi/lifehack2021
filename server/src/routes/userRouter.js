const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../utils/config/passport');
const cors = require('../utils/cors');

// Declare routes & configure middleware
const userRouter = express.Router();
userRouter.use(express.json());

userRouter
    .route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(204);
    })
    .get(cors.cors, userController.getAllUsers);

userRouter
    .route('/profiles')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(204);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, userController.putUser);

userRouter
    .route('/profiles/:username')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(204);
    })
    .get(cors.cors, userController.getUser);

userRouter
    .route('/profiles/:username/assignments/:assignmentId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(204);
    })
    .put(cors.cors, userController.getUser);

userRouter
    .route('/register')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(204);
    })
    .post(cors.corsWithOptions, userController.registerUser);

userRouter
    .route('/login')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(204);
    })
    .post(
        cors.corsWithOptions,
        userController.authenticateLogin,
        userController.loginUser
    );

userRouter
    .route('/sociallogin')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(204);
    })
    .post(cors.corsWithOptions, userController.socialLoginUser);

module.exports = userRouter;
