import isEmpty from 'is-empty';

// Import middlewares
const passport = require('passport');
const authenticate = require('../utils/config/passport');

// Load input validation
const validateRegisterInput = require('../utils/validation/register');
const validateLoginInput = require('../utils/validation/login');
import { validateWithProvider } from '../utils/validation/sociallogin';

// Import schema model of users
const Users = require('../models/user');

/**
 * @route POST users/register
 * @desc Register user
 */
exports.registerUser = (req, res, next) => {
    // Validate user input
    const { errors, success } = validateRegisterInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({ success: false, errors: errors });
    }

    // Check whether there are duplicate emails
    Users.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    success: false,
                    errors: { username: 'Username already exists' }
                });
            } else {
                Users.register(
                    new Users({
                        username: req.body.username,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        admin: req.body.admin,
                        profilePicture: req.body.profilePicture
                    }),
                    req.body.password,
                    (err, user) => {
                        if (err) {
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({
                                success: false,
                                errors: { email: 'Email already exists' }
                            });
                        } else {
                            // Adds firstName, email and admin status to the user object
                            user.firstName = req.body.firstName;
                            user.email = req.body.email;
                            user.admin = req.body.admin;

                            // Adds profile picture to user
                            user.profilePicture = req.body.profilePicture;

                            if (req.body.lastName) {
                                user.lastName = req.body.lastName;
                            }

                            user.save((err) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.setHeader(
                                        'Content-Type',
                                        'application/json'
                                    );
                                    res.json({
                                        success: false,
                                        message: err.message
                                    });
                                    return;
                                }

                                passport.authenticate('local')(req, res, () => {
                                    const newUser = {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        username: user.username,
                                        profilePicture: user.profilePicture,
                                        email: user.email,
                                        admin: user.admin,
                                        _id: user._id
                                    };

                                    res.statusCode = 200;
                                    res.setHeader(
                                        'Content-Type',
                                        'application/json'
                                    );
                                    res.json({
                                        success: true,
                                        status: 'Registration Successful!',
                                        data: newUser,
                                        errors: {}
                                    });
                                });
                            });
                        }
                    }
                );
            }
        })
        .catch((err) => console.log(err));
};

// Authenticate user with custom error message
exports.authenticateLogin = (req, res, next) => {
    // Form validation
    const { errors, success } = validateLoginInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        passport.authenticate('local', { session: false }, (err, user) => {
            if (err || !user) {
                res.status(401).json({
                    success: false,
                    errors: {
                        message: 'Email or password is incorrect'
                    }
                });
            } else {
                req.user = user;
                return next();
            }
        })(req, res, next);
    }
};

/**
 * @route POST users/login
 * @desc Login user
 */
exports.loginUser = (req, res, next) => {
    const token = authenticate.getToken({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        success: true,
        token: 'Bearer ' + token,
        status: 'You are successfully logged in!',
        errors: {}
    });
};

/**
 * @route POST users/sociallogin
 * @desc Login user through social media
 */
exports.socialLoginUser = (req, res, next) => {
    const network = req.body.network;
    const token = req.body.token;

    validateWithProvider(network, token)
        .then((profile) => {
            if (profile.error || profile.serviceErrorCode) {
                let errMessage = '';
                if (profile.error) {
                    errMessage = profile.error;
                } else {
                    errMessage = profile.message;
                }

                res.status(400).json(errMessage);
            } else {
                const username = profile.email.substring(
                    0,
                    profile.email.lastIndexOf('@')
                );
                Users.findOne({ email: profile.email, username: username })
                    .then((user) => {
                        if (user) {
                            const userToken = {
                                _id: user._id,
                                username: user.username,
                                email: user.email
                            };
                            res.json({
                                success: true,
                                token:
                                    'Bearer ' +
                                    authenticate.getToken(userToken),
                                username: user.username
                            });
                        } else {
                            const img = profile.picture.replace(
                                '=s96-c',
                                '=s800-c'
                            );

                            // Create a new account for the social sign in user
                            const newUser = new Users({
                                username: username,
                                email: profile.email,
                                firstName: profile.given_name,
                                lastName: profile.family_name,
                                socialPicture: img,
                                loginType: 'google'
                            });

                            // Save new User in database
                            newUser
                                .save()
                                .then((user) => {
                                    const userToken = {
                                        _id: user._id,
                                        username: user.username,
                                        email: user.email
                                    };

                                    res.statusCode = 200;
                                    res.json({
                                        success: true,
                                        token:
                                            'Bearer ' +
                                            authenticate.getToken(userToken),
                                        username: user.username
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.status(409).json({
                                        newaccountissue:
                                            'Failed to create new account'
                                    });
                                });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(409).json({
                            newaccountissue: 'Failed to create new account'
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(409).json({
                newaccountissue: 'Failed to create new account'
            });
        });
};

/**
 * @route GET /users
 * @desc Get a list of all users. Admin only.
 */
exports.getAllUsers = (req, res, next) => {
    Users.find({})
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
            console.log(err);
        });
};

/**
 * @route GET /users/profiles
 * @desc Get the current user
 */
exports.getUser = (req, res, next) => {
    Users.findOne({
        username: req.params.username
    })
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
            console.log(err);
        });
};

/**
 * @route PUT /users/profiles.
 * @desc edit an existing entry for the current user's profile.
 */
exports.putUser = (req, res, next) => {
    if (req.body.username) {
        const user = await Users.find({ username: req.body.username });
        if (!isEmpty(user)) {
            console.log('Username is taken');
            res.status(400).json({
                error: 'Bad Request',
                message: 'Username is taken!'
            });
            return;
        }
    }

    Users.findByIdAndUpdate(
        req.user._id,
        {
            $set: req.body
        },
        { new: true }
    )
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (res.locals) {
                res.locals.user = user;
                res.send(res.locals);
            } else res.send(user);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
};
