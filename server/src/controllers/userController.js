import express, { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../models/user';
import { IRequest } from '../utils/interface';
import { deleteUserFollowingOrgs } from '../controllers/organisationFollowController';
import { deleteS3File } from '../utils/multerConfig';
import isEmpty from 'is-empty';
import sha1 from 'sha1';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Model } from 'mongoose';

// Import middlewares
import passport from 'passport';
import { getToken } from '../utils/config/passport';
import Validator from 'validator';

import { getAuthUrl, validateGoogle } from '../utils/validation/sociallogin';

// Load input validation
import { validateRegisterInput } from '../utils/validation/register';
import { validateLoginInput } from '../utils/validation/login';
import { validateResetPasswordInput } from '../utils/validation/resetPassword';
import {
    validateWithProvider,
    validateLinkedIn
} from '../utils/validation/sociallogin';
import {
    sendConfirmationEmail,
    sendPasswordResetEmail
} from '../utils/nodemailer';

// Import schema model of users
import { Users } from '../models/user';
import { Tokens } from '../models/token';

import { deleteMultipleLandscapes } from '../controllers/landscapeController';
import {
    deleteFollowings,
    deleteFollows
} from '../controllers/userFollowController';
import { deleteStaff } from '../controllers/staffController';
import { Organisations } from '../models/organisation';

/**
 * @route POST users/register
 * @desc Register user
 */
export const registerUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Validate user input
    const { errors, success } = validateRegisterInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({ success: false, errors: errors });
    }

    // Check whether there are duplicate emails
    Users.findOne({ username: req.body.username })
        .then((user: UserDocument) => {
            if (user) {
                return res.status(400).json({
                    success: false,
                    errors: { username: 'Username already exists' }
                });
            } else {
                const confirmationCode = sha1(req.body.username);
                // @ts-ignore
                Users.register(
                    new Users({
                        username: req.body.username,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        admin: req.body.admin,
                        profilePicture: req.body.profilePicture,
                        confirmationCode,
                        status: req.body.status
                    }),
                    req.body.password,
                    (err: Error, user: UserDocument) => {
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

                            user.save((err: Error) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.setHeader(
                                        'Content-Type',
                                        'application/json'
                                    );
                                    return res.json({
                                        success: false,
                                        message: err.message
                                    });
                                }

                                passport.authenticate('local')(req, res, () => {
                                    const newUser = {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        username: user.username,
                                        profilePicture: user.profilePicture,
                                        email: user.email,
                                        admin: user.admin,
                                        confirmationCode,
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

                                sendConfirmationEmail(
                                    user.firstName,
                                    user.lastName,
                                    user.email,
                                    user.confirmationCode
                                );
                            });
                        }
                    }
                );
            }
        })
        .catch((err: Error) => console.log(err));
};

export const generateNewToken = (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const { email, username, userId } = req.body;
    const token = getToken({
        _id: userId,
        email,
        username
    });
    Users.findById(userId)
        .then((user: UserDocument) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success: true,
                token: 'Bearer ' + token,
                message: 'You are successfully logged in!',
                status: user.status,
                username: user.username,
                errors: {}
            });
        })
        .catch((err: Error) => {
            res.json({
                message: 'User does not exist!'
            });
        });
};

// Authenticate user with custom error message
export const authenticateLogin = (
    req: any,
    res: Response,
    next: NextFunction
) => {
    // Form validation
    const { errors, success } = validateLoginInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        passport.authenticate(
            'local',
            { session: false },
            (err: Error, user: UserDocument) => {
                if (err || !user) {
                    return res.status(401).json({
                        success: false,
                        errors: {
                            message: 'Email or password is incorrect'
                        }
                    });
                } else if (user.status == 'Pending') {
                    return res.status(401).json({
                        success: false,
                        errors: {
                            message:
                                'Please verify your email to activate your account'
                        }
                    });
                } else {
                    req.user = user;
                    return next();
                }
            }
        )(req, res, next);
    }
};

/**
 * @route POST users/login
 * @desc Login user
 */
export const loginUser = (req: IRequest, res: Response, next: NextFunction) => {
    const token = getToken({
        _id: req.user._id,
        email: req.user.email,
        username: req.user.username
    });

    Users.findById(req.user._id).then((user: UserDocument) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true,
            token: 'Bearer ' + token,
            message: 'You are successfully logged in!',
            status: user.status,
            username: req.user.username,
            errors: {}
        });
    });
};

export const getGoogleClientRedirectLink = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url = getAuthUrl();
    res.status(200).json({
        redirect_url: url
    });
};

/**
 * @route POST users/sociallogin/google
 * @desc Login user through Google oAuth
 */
export const googleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const network = req.body.network;
    const token = req.body.token;

    const result = await validateGoogle(
        '4%2F0AX4XfWi_1JfyfEGwSwTh-qZqK9-ZIrrk7Jf_i9sxj0Da3BpzN679-p6bAqG2_W5ezqh46w&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent#'
    );
    res.json({ result: result });
    return;
    // validateWithProvider(network, token)
    //     .then((profile: any) => {
    //         if (profile.error || profile.serviceErrorCode) {
    //             let errMessage = '';
    //             if (profile.error) {
    //                 errMessage = profile.error;
    //             } else {
    //                 errMessage = profile.message;
    //             }

    //             res.status(400).json(errMessage);
    //         } else {
    //             // let username = profile.given_name + profile.family_name;
    //             // username = username.toLowerCase();
    //             const username = profile.email;
    //             Users.findOne({ email: profile.email })
    //                 .then((user: UserDocument) => {
    //                     if (user) {
    //                         const userToken = {
    //                             _id: user._id,
    //                             email: user.email,
    //                             username: user.username
    //                         };
    //                         res.json({
    //                             success: true,
    //                             token: 'Bearer ' + getToken(userToken),
    //                             status: user.status,
    //                             username: user.username
    //                         });
    //                     } else {
    //                         const confirmationCode = sha1(username);
    //                         const img = profile.picture.replace(
    //                             '=s96-c',
    //                             '=s800-c'
    //                         );
    //                         // Create a new account for the social sign in user
    //                         const newUser = new Users({
    //                             username: username,
    //                             email: profile.email,
    //                             firstName: profile.given_name,
    //                             lastName: profile.family_name,
    //                             socialPicture: img,
    //                             status: 'Email Confirmed',
    //                             loginType: 'google',
    //                             confirmationCode
    //                         });

    //                         // Save new User in database
    //                         newUser
    //                             .save()
    //                             .then((user: UserDocument) => {
    //                                 const userToken = {
    //                                     _id: user._id,
    //                                     email: user.email,
    //                                     username: user.username
    //                                 };

    //                                 res.statusCode = 200;
    //                                 res.json({
    //                                     success: true,
    //                                     token: 'Bearer ' + getToken(userToken),
    //                                     status: user.status,
    //                                     username: user.username
    //                                 });
    //                             })
    //                             .catch((err: Error) => {
    //                                 console.log(err);
    //                                 res.status(409).json({
    //                                     newaccountissue:
    //                                         'Failed to create new account'
    //                                 });
    //                             });
    //                     }
    //                 })
    //                 .catch((err: Error) => {
    //                     console.log(err);
    //                     res.status(409).json({
    //                         newaccountissue: 'Failed to create new account'
    //                     });
    //                 });
    //         }
    //     })
    //     .catch((err: Error) => {
    //         console.log(err);
    //         res.status(409).json({
    //             newaccountissue: 'Failed to create new account'
    //         });
    //     });
};

/**
 * @route POST users/login/linkedin
 * @desc Login user through LinkedIn
 */
export const linkedinLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const network = req.body.network;
    const token = req.body.token;

    validateLinkedIn(token).then((profile: any) => {
        if (profile.error) {
            res.status(400).json(profile.error);
        } else {
            const { country, language } = profile.firstName.preferredLocale;
            const nameProp = `${language}_${country}`;
            // let username =
            //     profile.firstName.localized[nameProp] +
            //     profile.lastName.localized[nameProp];
            // username = username.toLowerCase();
            const username = profile.email;
            Users.findOne({ email: profile.email })
                .then((user: UserDocument) => {
                    if (user) {
                        const userToken = {
                            _id: user._id,
                            email: user.email,
                            username: user.username
                        };
                        res.json({
                            success: true,
                            token: 'Bearer ' + getToken(userToken),
                            status: user.status,
                            username: user.username
                        });
                    } else {
                        const confirmationCode = sha1(username);
                        // Create a new account for the social sign in user
                        const newUser = new Users({
                            username: username,
                            email: profile.email,
                            firstName: profile.firstName.localized[nameProp],
                            lastName: profile.lastName.localized[nameProp],
                            socialPicture:
                                profile.profilePicture['displayImage~']
                                    .elements[3].identifiers[0].identifier,
                            status: 'Email Confirmed',
                            loginType: 'linkedin',
                            confirmationCode
                        });

                        // Save new User in database
                        newUser
                            .save()
                            .then((user: UserDocument) => {
                                const userToken = {
                                    _id: user._id,
                                    email: user.email,
                                    username: user.username
                                };

                                res.statusCode = 200;
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + getToken(userToken),
                                    status: user.status,
                                    username: user.username
                                });
                            })
                            .catch((err: Error) => {
                                res.status(409).json({
                                    newaccountissue:
                                        'Failed to create new account'
                                });
                            });
                    }
                })
                .catch((err: Error) => {
                    res.status(409).json({
                        newaccountissue: 'Failed to create new account'
                    });
                });
        }
    });
};

/**
 * @route GET /users
 * @desc Get a list of all users. Admin only.
 */
export async function getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const users = await (Users as Model<UserDocument>)
            .find({})
            .populate('organisation', '_id name');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

/**
 * @route GET /users/profiles
 * @desc Get the current user
 */
export async function getUser(req: any, res: Response, next: NextFunction) {
    try {
        const user = await (Users as Model<UserDocument>)
            .findOne({
                username: req.params.username
            })
            .populate('organisation', '_id name');
        if (user != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        } else {
            res.statusCode = 404;
            res.send(`Username ${req.params.username} not found!`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

/**
 * @route PUT /users/profiles.
 * @desc edit an existing entry for the current user's profile.
 */
export const putUser = async (req: any, res: Response, next: NextFunction) => {
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
        .then((user: UserDocument) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (res.locals) {
                res.locals.user = user;
                res.send(res.locals);
            } else res.send(user);
        })
        .catch((err: Error) => {
            res.statusCode = 500;
            res.send(err);
        });
};

/**
 * @route DELETE /users/profiles
 * @desc Delete the current user
 */
export const deleteUser = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    Users.findByIdAndRemove(req.user._id)
        .then((user: UserDocument) => {
            req.body.userId = user._id;
            req.body.following = user.following;
            req.body.followers = user.followers;
            req.body.followingOrgs = user.followingOrgs;
            req.body.organisation = user.organisation;
            req.body.isUserDeleted = true;
            req.body.landscapes = user.landscapes;

            if (!isEmpty(user.profilePicture.key)) {
                req.params.key = user.profilePicture.key;
                deleteS3File(req, res, next);
            }

            deleteFollows(req, res, next);
            deleteFollowings(req, res, next);
            deleteUserFollowingOrgs(req, res, next);

            // Remove user from all organisation
            req.body.organisation.map((organisationId: string) => {
                req.params.organisationId = organisationId;
                deleteStaff(req, res, next);
            });

            // Remove all user's landscapes
            deleteMultipleLandscapes(req, res, next);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({
                success: true,
                deleted: user
            });
        })
        .catch((err: Error) => {
            res.statusCode = 500;
            res.send(err);
        });
};

export const confirmEmail = (req: any, res: Response, next: NextFunction) => {
    Users.findOneAndUpdate(
        { confirmationCode: req.params.confirmationCode },
        {
            $set: { status: 'Email Confirmed' }
        },
        { new: true }
    )
        .then((user: UserDocument) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(user);
        })
        .catch((err: Error) => {
            res.statusCode = 500;
            res.json({
                success: false,
                errors: err
            });
        });
};

export const resendEmail = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
        res.statusCode = 404;
        res.send('User not found!');
    } else {
        sendConfirmationEmail(
            user.firstName,
            user.lastName,
            user.email,
            user.confirmationCode
        )
            .then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send({ message: 'Email sent successfully!' });
            })
            .catch((err: Error) => {
                res.statusCode = 500;
                res.json(err);
            });
    }
};

export const requestPasswordReset = async (req: any, res: Response) => {
    const { email } = req.body;

    if (!Validator.isEmail(email)) {
        res.statusCode = 404;
        return res.send({ message: 'Email is invalid!' });
    }

    const user = await Users.findOne({ email });

    if (!user) {
        res.statusCode = 404;
        return res.send({ message: 'Email not found!' });
    }

    let token = await Tokens.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

    await new Tokens({
        userId: user._id,
        token: hash,
        createdAt: Date.now()
    }).save();

    await sendPasswordResetEmail(
        user._id,
        user.firstName,
        user.lastName,
        user.email,
        resetToken
    );

    res.status(200).send('Password reset email succesfully sent!');
};

export const resetPassword = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    // Validate user input
    const { errors, success } = validateResetPasswordInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({ success: false, errors: errors });
    }

    const { userId, password } = req.body;
    const token = req.params.resetToken;
    let passwordResetToken = await Tokens.findOne({ userId });

    // Token does not exist
    if (!passwordResetToken) {
        return res.status(400).json({
            errors: { message: 'Invalid or expired password reset token' }
        });
    }
    // Token for the user exists but does not match the requested token
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        return res.status(400).json({
            errors: { message: 'Invalid or expired password reset token' }
        });
    }

    const user = await Users.findById(userId);

    if (!user) {
        return res
            .status(404)
            .json({ errors: { message: 'User does not exist!' } });
    } else {
        await passwordResetToken.remove();
        // @ts-ignore
        user.setPassword(password, () => {
            user.save();
            return res
                .status(200)
                .json({ message: 'Password reset successful!' });
        });
    }
};

export const getUserOrganisation = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const user = await Users.find({ username: req.params.username });
    if (isEmpty(user)) {
        return res
            .status(404)
            .json({ errors: { message: 'User does not exist!' } });
    }

    const organisations = await Organisations.find({
        _id: { $in: user[0].organisation }
    })
        .populate('followers', 'username _id')
        .populate('staff.user', 'username _id');

    if (isEmpty(organisations)) {
        return res.status(404).json({
            errors: { message: 'User does not have any organisations!' }
        });
    }

    return res.status(200).json({ organisations });
};
