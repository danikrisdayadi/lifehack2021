import { Request, Response, NextFunction } from 'express';
import {
    LandscapeDocument,
    LandscapePopulatedDocument
} from '../models/landscape';
import { Model } from 'mongoose';
// Import schema model and type interface of Landscape
import { Landscapes } from '../models/landscape';

/**
 * GET /landscapes/:landscapeId/comments/:commentId/replies route
 * to retrieve all the replies
 * pertaining to a comment given its id
 */
export async function getAllReplies(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>)
        .findById(req.params.landscapeId)
        .populate({
            path: 'comments.replies.author',
            populate: {
                path: 'comments.replies.author',
                model: 'User'
            }
        });

    if (
        landscape != null &&
        landscape.comments.id(req.params.commentId) != null
    ) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(landscape.comments.id(req.params.commentId).replies);
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
 * POST /landscapes/:landscapeId/comments/:commentId/replies route
 * to save a new reply
 * pertaining to a comment given its id
 */
export async function postReply(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
            req.params.landscapeId
        );
        if (
            landscape != null &&
            landscape.comments.id(req.params.commentId) != null
        ) {
            /**
             * Add current user's id as the author field
             * into the req.body to be saved as a comment
             */

            // TODO: USER Schema
            // req.body.author = req.user._id;

            // The particular comment given its id
            let comment = landscape.comments.id(req.params.commentId);

            await comment.replies.push(req.body);
            const reply: LandscapeDocument = await landscape.save();
            const updatedLandscape = await (Landscapes as Model<LandscapeDocument>)
                .findById(landscape._id)
                .populate({
                    path: 'comments.replies.author',
                    populate: {
                        path: 'comments.replies.author',
                        model: 'User'
                    }
                });
            comment = updatedLandscape.comments.id(req.params.commentId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment.replies);
        } else if (landscape == null) {
            let err = new Error(
                'Landscape ' + req.params.landscapeId + ' not found'
            );
            res.statusCode = 404;
            return next(err);
        } else {
            let err = new Error(
                'Comment ' + req.params.commentId + ' not found!'
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
 * PUT /landscapes/:landscapeId/comments/:commentId/replies route
 * to return error: operation unsupported
 */
export async function updateAllReplies(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.statusCode = 403;
    res.end(
        'PUT operation not supported on /api/landscapes/' +
            req.params.landscapeId +
            '/comments/' +
            req.params.commentId +
            '/replies'
    );
}

/**
 * DELETE /landscapes/:landscapeId/comments/:commentId/replies route
 * to delete all replies
 * pertaining to a comment given its id
 */
export async function deleteAllReplies(
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
        // The particular comment given its id
        let comment = landscape.comments.id(req.params.commentId);

        // To iteratively delete the replies
        for (let i = comment.replies.length - 1; i >= 0; i--) {
            comment.replies.id(comment.replies[i]._id).remove();
        }

        const updatedLandscape: LandscapeDocument = await landscape.save();

        comment = updatedLandscape.comments.id(req.params.commentId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comment);
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
 * GET /landscapes/:landscapeId/comments/:commentId/replies/:replyId route
 * to retrieve a reply given its id
 */
export async function getReply(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>)
        .findById(req.params.landscapeId)
        .populate({
            path: 'comments.replies.author',
            populate: {
                path: 'comments.replies.author',
                model: 'User'
            }
        });

    if (landscape != null) {
        // The particular comment given its id
        const comment = landscape.comments.id(req.params.commentId);

        if (comment != null && comment.replies.id(req.params.replyId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment.replies.id(req.params.replyId));
        } else if (comment == null) {
            let err = new Error(
                'Comment ' + req.params.commentId + ' not found!'
            );
            res.statusCode = 404;
            return next(err);
        } else {
            let err = new Error('Reply ' + req.params.replyId + ' not found!');
            res.statusCode = 404;
            return next(err);
        }
    } else {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found'
        );
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * POST /landscapes/:landscapeId/comments/:commentId/replies/:replyId route
 * to return error: operation not supported
 */
export async function postReplyById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.statusCode = 403;
    res.end(
        'POST operation not supported on /api/landscapes/' +
            req.params.landscapeId +
            '/comments/' +
            req.params.commentId +
            '/replies/' +
            req.params.replyId
    );
}

/**
 * PUT /landscapes/:landscapeId/comments/:commentId/replies/:replyId route
 * to update a reply given its id
 */
export async function updateReply(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
        req.params.landscapeId
    );
    if (landscape != null) {
        // The particular comment given its id
        let comment = landscape.comments.id(req.params.commentId);

        if (comment != null && comment.replies.id(req.params.replyId) != null) {
            if (req.body.content) {
                comment.replies.id(req.params.replyId).content =
                    req.body.content;
            }

            const updateLandscape: LandscapeDocument = await landscape.save();

            const updatedLandscape = await (Landscapes as Model<LandscapeDocument>)
                .findById(updateLandscape._id)
                .populate({
                    path: 'comments.replies.author',
                    populate: {
                        path: 'comments.replies.author',
                        model: 'User'
                    }
                });
            comment = updatedLandscape.comments.id(req.params.commentId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment.replies);
        } else if (comment == null) {
            let err = new Error(
                'Comment ' + req.params.commentId + ' not found!'
            );
            res.statusCode = 404;
            return next(err);
        } else {
            let err = new Error('Reply ' + req.params.replyId + ' not found!');
            res.statusCode = 404;
            return next(err);
        }
    } else {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found'
        );
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * DELETE /landscapes/:landscapeId/comments/:commentId/replies/:replyId route
 * to retrieve a reply given its id.
 */
export async function deleteReply(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
        req.params.landscapeId
    );
    if (landscape != null) {
        // The particular comment given its id
        let comment = landscape.comments.id(req.params.commentId);

        if (comment != null && comment.replies.id(req.params.replyId) != null) {
            // Remove the reply given its id
            comment.replies.id(req.params.replyId).remove();

            // Save the newly updated landscape
            const deleteReply: LandscapeDocument = await landscape.save();
            const deletedLandscape = await (Landscapes as Model<LandscapeDocument>)
                .findById(landscape._id)
                .populate({
                    path: 'comments.replies.author',
                    populate: {
                        path: 'comments.replies.author',
                        model: 'User'
                    }
                });
            comment = deletedLandscape.comments.id(req.params.commentId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment.replies);
        } else if (comment == null) {
            let err = new Error(
                'Comment ' + req.params.commentId + ' not found!'
            );
            res.statusCode = 404;
            return next(err);
        } else {
            let err = new Error('Reply ' + req.params.replyId + ' not found!');
            res.statusCode = 404;
            return next(err);
        }
    } else {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found'
        );
        res.statusCode = 404;
        return next(err);
    }
}
