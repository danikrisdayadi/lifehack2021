import { Request, Response, NextFunction } from 'express';
import { LandscapeDocument } from '../models/landscape';
import { Model } from 'mongoose';
// Import schema model and type interface of Landscape
import { Landscapes } from '../models/landscape';

/**
 * GET /landscapes/:landscapeId/comments route
 * to retrieve all the comments
 * pertaining to a landscape given its id
 */
export async function getAllComments(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>)
        .findById(req.params.landscapeId)
        .populate([
            {
                path: 'comments.author',
                populate: {
                    path: 'comments.author',
                    model: 'User'
                }
            },
            {
                path: 'comments.replies.author',
                populate: {
                    path: 'comments.replies.author',
                    model: 'User'
                }
            }
        ]);
    if (landscape != null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(landscape.comments);
    } else {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found!'
        );
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * POST /landscapes/:landscapeId/comments route
 * to save a new comment
 * pertaining to a landscape given its id
 */
export async function postComment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
            req.params.landscapeId
        );
        if (landscape != null) {
            /**
             * Add current user's id as the author field
             * into the req.body to be saved as a comment
             */

            // TODO: USER Schema
            // req.body.author = req.user._id;
            landscape.comments.push(req.body);
            const commented: LandscapeDocument = await landscape.save();

            const populatedLandscape = await (Landscapes as Model<LandscapeDocument>)
                .findById(commented._id)
                .populate([
                    {
                        path: 'comments',
                        populate: {
                            path: 'author',
                            model: 'User'
                        }
                    },
                    {
                        path: 'comments.replies.author',
                        populate: {
                            path: 'comments.replies.author',
                            model: 'User'
                        }
                    }
                ]);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(populatedLandscape.comments);
        } else {
            let err = new Error(
                'Landscape ' + req.params.landscapeId + ' not found!'
            );
            res.statusCode = 404;
            return next(err);
        }
    } catch (err) {
        res.statusCode = 400;
        res.send(err);
    }
}

/**
 * PUT /landscapes/:landscapeId/comments route
 * to return error: operation unsupported
 */
export async function updateAllComments(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.statusCode = 403;
    res.end(
        'PUT operation not supported on /api/landscapes/' +
            req.params.landscapeId +
            '/comments'
    );
}

/**
 * DELETE /landscapes/:landscapeId/comments route
 * to delete all comments
 * pertaining to a landscape given its id
 */
export async function deleteAllComments(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
        req.params.landscapeId
    );

    if (landscape != null) {
        for (let i = landscape.comments.length - 1; i >= 0; i--) {
            landscape.comments.id(landscape.comments[i]._id).remove();
        }

        const deletedLandscape: LandscapeDocument = await landscape.save();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(deletedLandscape);
    } else {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found!'
        );
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * GET /landscapes/:landscapeId/comments/:commentId route
 * to retrieve a comment given its id
 */
export async function getComment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>)
        .findById(req.params.landscapeId)
        .populate([
            {
                path: 'comments',
                populate: {
                    path: 'author',
                    model: 'User'
                }
            },
            {
                path: 'comments.replies.author',
                populate: {
                    path: 'comments.replies.author',
                    model: 'User'
                }
            }
        ]);

    if (
        landscape != null &&
        landscape.comments.id(req.params.commentId) != null
    ) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(landscape.comments.id(req.params.commentId));
    } else if (landscape == null) {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found'
        );
        res.statusCode = 404;
        return next(err);
    } else {
        let err = new Error('Comment ' + req.params.commentId + ' not found!');
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * POST /landscapes/:landscapeId/comments/:commentId route
 * to return error: operation not supported
 */
export async function postCommentById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.statusCode = 403;
    res.end(
        'POST operation not supported on /api/landscapes/' +
            req.params.landscapeId +
            '/comments/' +
            req.params.commentId
    );
}

/**
 * PUT /landscapes/:landscapeId/comments/:commentId route
 * to update a comment given its id
 */
export async function updateComment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
        req.params.landscapeId
    );
    if (
        landscape != null &&
        landscape.comments.id(req.params.commentId) != null
    ) {
        /**
         * If req.body.content exists
         * update the content of the comment given its id
         */
        if (req.body.content) {
            landscape.comments.id(req.params.commentId).content =
                req.body.content;
        }

        const updateLandscape: LandscapeDocument = await landscape.save();
        const updatedLandscape = await (Landscapes as Model<LandscapeDocument>)
            .findById(updateLandscape._id)
            .populate([
                {
                    path: 'comments',
                    populate: {
                        path: 'author',
                        model: 'User'
                    }
                },
                {
                    path: 'comments.replies.author',
                    populate: {
                        path: 'comments.replies.author',
                        model: 'User'
                    }
                }
            ]);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(updatedLandscape.comments);
    } else if (landscape == null) {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found'
        );
        res.statusCode = 404;
        return next(err);
    } else {
        let err = new Error('Comment ' + req.params.commentId + ' not found!');
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * DELETE /landscapes/:landscapeId/comment/:commentId route
 * to retrieve a comment given its id.
 */
export async function deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
        req.params.landscapeId
    );
    if (
        landscape != null &&
        landscape.comments.id(req.params.commentId) != null
    ) {
        await landscape.comments.id(req.params.commentId).remove();
        const deleteComment: LandscapeDocument = await landscape.save();
        const deletedComment = await (Landscapes as Model<LandscapeDocument>)
            .findById(deleteComment._id)
            .populate([
                {
                    path: 'comments.author',
                    populate: {
                        path: 'comments.author',
                        model: 'User'
                    }
                },
                {
                    path: 'comments.replies.author',
                    populate: {
                        path: 'comments.replies.author',
                        model: 'User'
                    }
                }
            ]);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(deletedComment.comments);
    } else if (landscape == null) {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found'
        );
        res.statusCode = 404;
        return next(err);
    } else {
        let err = new Error('Comment ' + req.params.commentId + ' not found!');
        res.statusCode = 404;
        return next(err);
    }
}
