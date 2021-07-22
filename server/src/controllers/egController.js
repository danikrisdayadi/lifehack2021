// Import express Types
import { Request, Response, NextFunction } from 'express';
import {
    LandscapeDocument,
    LandscapePopulatedDocument
} from '../models/landscape';
import { deleteS3File } from '../utils/multerConfig';
import { Model } from 'mongoose';

// Import schema model of Landscape
import { Landscapes } from '../models/landscape';
import { Users } from '../models/user';
import { Types } from 'mongoose';

const countries = [
    'Brunei',
    'Myanmar',
    'Cambodia',
    'Indonesia',
    'Laos',
    'Malaysia',
    'Philippines',
    'Singapore',
    'Thailand',
    'Vietnam',
    'Timor-Leste',
    'Global',
    'Across Southeast Asia'
];

// GET /landscapes route to retrieve all the landscapes.
export async function getAllLandscapes(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (Object.keys(req.query).length === 0) {
        const landscapes = await (Landscapes as Model<LandscapeDocument>)
            .find({})
            .populate([
                {
                    path: 'author',
                    populate: { path: 'author' }
                },
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
        res.json(landscapes);
    } else if (req.query.countries) {
        let invalidCountry = true;
        if (req.query.countries instanceof Object) {
            Object.values(req.query.countries).forEach((queriedCountry) => {
                for (let i = 0; i < countries.length; i++) {
                    if (queriedCountry == countries[i]) {
                        invalidCountry = false;
                    }
                }
            });
        } else {
            countries.forEach((country) => {
                if (req.query.countries == country) {
                    invalidCountry = false;
                }
            });
        }

        if (invalidCountry) {
            res.status(400).end('Invalid country/countries searched.');
        } else {
            const landscapes = await (Landscapes as Model<LandscapeDocument>)
                .find({
                    countries: { $in: req.query.countries as string[] }
                })
                .populate([
                    {
                        path: 'author',
                        populate: { path: 'author' }
                    },
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
            res.json(landscapes);
        }
    }
}

// POST /landscapes route to save a new landscape.
// TODO: interface for req
export async function postLandscape(
    req: any,
    res: Response,
    next: NextFunction
) {
    try {
        // Creates new Landscape with the updated req.body
        const newLandscape = new Landscapes(req.body);

        // Save Landscape to DB
        const landscape = await newLandscape.save();

        await Users.findByIdAndUpdate(req.body.author, {
            $addToSet: { landscapes: landscape._id }
        });

        const populatedLandscapes = await (Landscapes as Model<LandscapeDocument>)
            .findById(landscape._id)
            .populate([
                {
                    path: 'author',
                    populate: { path: 'author' }
                },
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
        res.json(populatedLandscapes);
    } catch (err) {
        if (err.errors) {
            res.statusCode = 400;
            res.send(err);
        } else {
            res.statusCode = 500;
            res.send(err);
        }
    }
}

// PUT /landscapes route to return error: operation unsupported
export async function updateAllLandscapes(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.statusCode = 403;
    res.end('PUT operation not supported on /api/landscapes');
}

/**
 * GET /landscapes/:landscapeId route
 * to retrieve a landscape given its id.
 */
export async function getLandscape(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>)
        .findById(req.params.landscapeId)
        .populate([
            {
                path: 'author',
                populate: { path: 'author' }
            },
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
        res.json(landscape);
    } else {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found!'
        );
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * POST /landscapes/:landscapeId route
 * to return error: operation not supported.
 */
export async function postLandscapeById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.statusCode = 403;
    res.end(
        'POST operation not supported on /api/landscapes/' +
            req.params.landscapeId
    );
}

/**
 * PUT /landscapes/:landscapeId route
 * to update a landscape given its id.
 */
export async function updateLandscape(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const oldLandscape = await Landscapes.findById(req.params.landscapeId);
    const landscape = await (Landscapes as Model<LandscapeDocument>).findByIdAndUpdate(
        req.params.landscapeId,
        {
            $set: req.body
        },
        { new: true }
    );
    if (req.body.author) {
        await Users.findByIdAndUpdate(oldLandscape.author, {
            $pull: { landscapes: req.params.landscapeId }
        });
        await Users.findByIdAndUpdate(req.body.author, {
            $addToSet: { landscapes: Types.ObjectId(req.params.landscapeId) }
        });
    }
    const populatedLandscape = await (Landscapes as Model<LandscapeDocument>)
        .findById(landscape._id)
        .populate([
            {
                path: 'author',
                populate: { path: 'author' }
            },
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
    res.json(populatedLandscape);
}

/**
 * DELETE /landscapes/:landscapeId route
 * to remove a landscape given its id.
 */
export async function deleteLandscape(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscape = await (Landscapes as Model<LandscapeDocument>).findById(
        req.params.landscapeId
    );
    if (landscape != null) {
        await Users.findByIdAndUpdate(landscape.author, {
            $pull: {
                landscapes: landscape._id
            }
        });
        const removedLandscape = await (Landscapes as Model<LandscapeDocument>).findByIdAndRemove(
            req.params.landscapeId
        );
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(removedLandscape);
    } else {
        let err = new Error(
            'Landscape ' + req.params.landscapeId + ' not found!'
        );
        res.statusCode = 404;
        return next(err);
    }
}

/**
 * DELETE /landscapes/multiple route (to do)
 * to remove a landscape given its id.
 */
export async function deleteMultipleLandscapes(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const landscapes = await (Landscapes as Model<LandscapeDocument>).find({
        _id: { $in: req.body.landscapes }
    });
    const thumbnailKeyList = landscapes.map((landscape: LandscapeDocument) => {
        if (landscape.thumbnail) {
            return landscape.thumbnail.key;
        }
    });

    thumbnailKeyList.map((key: string) => {
        req.params.key = key;
        deleteS3File(req, res, next);
    });

    const resp: object = await Landscapes.deleteMany({
        _id: { $in: req.body.landscapes }
    });
    return next();
}
