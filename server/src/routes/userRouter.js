import express from 'express';
import {
    getAllUsers,
    putUser,
    deleteUser,
    getUser,
    registerUser,
    authenticateLogin,
    loginUser,
    googleLogin,
    linkedinLogin,
    confirmEmail,
    resendEmail,
    requestPasswordReset,
    resetPassword,
    generateNewToken,
    getUserOrganisation,
    getGoogleClientRedirectLink
} from '../controllers/userController';
import {
    getFollows,
    postFollows,
    updateFollows,
    getFollow,
    postFollow,
    updateFollow,
    deleteFollow
} from '../controllers/userFollowController';
import {
    getAllResumes,
    postResume,
    updateAllResumes,
    deleteAllResumes,
    getResume,
    postResumeById,
    updateResume,
    deleteResume
} from '../controllers/resumeController';
import { verifyUser } from '../utils/config/passport';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';
import { checkUserType } from '../utils/userMiddleware';
import asyncHandler from 'express-async-handler';

// Declare routes & configure middleware
const userRouter = express.Router();
userRouter.use(express.json());

userRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), getAllUsers);

userRouter
    .route('/profiles')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .put(cors(corsOptionsDelegate), verifyUser, checkUserType, putUser)
    .delete(cors(corsOptionsDelegate), verifyUser, deleteUser);

userRouter
    .route('/profiles/:username')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), getUser);

userRouter
    .route('/profiles/:username/organisations')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), getUserOrganisation);

userRouter
    .route('/register')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), registerUser);

userRouter
    .route('/login')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), authenticateLogin, loginUser);

userRouter
    .route('/sociallogin/google')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), getGoogleClientRedirectLink)
    .post(cors(corsOptionsDelegate), googleLogin);

userRouter
    .route('/sociallogin/linkedin')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), linkedinLogin);

userRouter
    .route('/follows')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), verifyUser, asyncHandler(getFollows))
    .post(cors(corsOptionsDelegate), asyncHandler(postFollows))
    .put(cors(corsOptionsDelegate), asyncHandler(updateFollows));

userRouter
    .route('/follows/:followId')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getFollow))
    .post(cors(corsOptionsDelegate), asyncHandler(postFollow))
    .put(cors(corsOptionsDelegate), verifyUser, asyncHandler(updateFollow))
    .delete(cors(corsOptionsDelegate), verifyUser, asyncHandler(deleteFollow));

userRouter
    .route('/resumes')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getAllResumes))
    .post(cors(corsOptionsDelegate), verifyUser, asyncHandler(postResume))
    .put(cors(corsOptionsDelegate), asyncHandler(updateAllResumes))
    .delete(
        cors(corsOptionsDelegate),
        verifyUser,
        asyncHandler(deleteAllResumes)
    );

userRouter
    .route('/resumes/:resumeId')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getResume))
    .post(cors(corsOptionsDelegate), asyncHandler(postResumeById))
    .put(cors(corsOptionsDelegate), asyncHandler(updateResume))
    .delete(cors(corsOptionsDelegate), verifyUser, asyncHandler(deleteResume));

userRouter
    .route('/confirm/:confirmationCode')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .put(cors(corsOptionsDelegate), confirmEmail);

userRouter
    .route('/resend-email')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), resendEmail);

userRouter
    .route('/passwordReset')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), requestPasswordReset);

userRouter
    .route('/passwordReset/:resetToken')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .put(cors(corsOptionsDelegate), resetPassword);

userRouter
    .route('/newToken')
    .options(cors(corsOptionsDelegate), (req: Request, res: any) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), generateNewToken);

export default userRouter;
