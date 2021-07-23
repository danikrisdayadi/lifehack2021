const multer = require('multer');
const aws = require('aws-sdk');

// for multipart uploading to s3 without saving on local disk
const multerS3 = require('multer-s3-v3');

// Environment variables
// Import 'dotenv/config';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const fs = require('fs');
const https = require('https');

export const s3bucket = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// fileFilter function accepts images with extensions .jpg, .jpeg and .png only
const imageFileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
    }
};

export const uploadImage = multer({
    imageFileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3: s3bucket,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, image, cb) => {
            cb(null, Date.now().toString() + image.originalname);
        },
        throwMimeTypeConflictErrorIf: (contentType, mimeType, _file) => {
            ![mimeType, 'application/octet-stream'].includes(contentType);
        },
        // Limit image size to 2 MB
        limits: { fileSize: 2000000 }
    })
});

export const deleteFile = (req, res, next) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key
    };

    s3bucket.deleteObject(params, (error) => {
        if (error) {
            return next(error);
        }
        next();
    });
};

// fileFilter function accepts images with extensions .pdf, .doc or .docx only
const documentFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        cb(null, true);
    } else {
        cb(new Error('File uploaded is not of type pdf, doc, docx'), false);
    }
};

export const uploadDocument = multer({
    documentFilter,
    storage: multerS3({
        acl: 'public-read',
        s3: s3bucket,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, docu) => {
            cb(null, {
                mimetype: document.fieldname,
                originalName: document.originalname,
                key: Date.now().toString() + document.originalname
            });
        },
        key: (req, document) => {
            cb(null, Date.now().toString() + document.originalname);
        },
        contentDisposition: (req, document, cb) => {
            cb(null, 'attachment; filename ="' + document.originalname + '"');
        },
        throwMimeTypeConflictErrorIf: (contentType, mimeType, _file) => {
            ![mimeType, 'application/octet-stream'].includes(contentType);
        },
        // Limit file size to 2 MB
        limits: { fileSize: 2000000 }
    })
});
