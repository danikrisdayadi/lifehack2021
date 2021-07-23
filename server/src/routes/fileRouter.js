import express from 'express';
import { postFile, deleteFile } from '../controllers/fileController';
import { uploadDocument, deleteS3File } from '../utils/multerConfig';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';

//Declare routes and configure middleware
const fileRouter = express.Router();
fileRouter.use(express.json());

fileRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .post(
        cors(corsOptionsDelegate),
        uploadDocument.single('document'),
        postFile
    );

fileRouter
    .route('/:key')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .delete(cors(corsOptionsDelegate), deleteS3File, deleteFile);

export default fileRouter;
