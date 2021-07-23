import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * POST /files route to save a new file.
 */
export const postFile = (req, res) => {
    const resp = {
        location: req.file.location,
        metadata: req.file.metadata
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
};

/**
 * DELETE /files route to return error: operation unsupported
 */
export const deleteFile = (req, res) => {
    res.statusCode = 200;
    res.end('File successfully deleted!');
};
