import mongoose, { Types, Schema, Model, Document } from 'mongoose';
import { commentSchema } from './comment';

// Import Comment type interface
import { CommentPopulatedDocument, IComment } from './comment';

// Import User type interface
import { UserDocument } from './user';

const primaryCategories = [
    'Circular Economy',
    'Energy Transitions',
    'Future of Food & Agriculture',
    'Others'
];

const secondaryCategories = [
    'Carbon Emissions',
    'Pollution',
    'Resource Resilience',
    'Policy',
    'Society',
    'Technology',
    'Business'
];

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

// A schema for a Landscape Study post
const landscapeSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        tagline: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },

        thumbnail: {
            location: String,
            key: String
        },
        link: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        upvotes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        noOfUpvotes: {
            type: Number,
            default: 0
        },
        noOfComments: {
            type: Number,
            default: 0
        },
        comments: [commentSchema],
        primaryCategories: {
            type: [String],
            enum: primaryCategories,
            validate: (v: any) => Array.isArray(v) && v.length > 0
        },
        secondaryCategories: {
            type: [String],
            enum: secondaryCategories,
            validate: (v: any) => Array.isArray(v)
        },
        countries: {
            type: [String],
            enum: countries,
            validate: (v: any) => Array.isArray(v) && v.length > 0
        }
    },
    {
        timestamps: true
    }
);

// Create interface Landscape for Typescript
export interface ILandscape {
    title: string;
    tagline: string;
    description: string;
    thumbnail?: { location: string; key: string };
    link: string;
    author: Types.ObjectId | Record<string, any>;
    upvotes: Types.ObjectId[];
    noOfUpvotes: number;
    noOfComments: number;
    comments: Types.DocumentArray<IComment>;
    primaryCategories: string[];
    secondaryCategories?: string[];
    countries: string[];
}

// LandscapeDocument BEFORE author is populated by User
export interface LandscapeDocument extends Document, ILandscape {
    author: UserDocument['_id'];
}

// LandscapeDocument AFTER author is populated by User
export interface LandscapePopulatedDocument extends ILandscape, Document {
    comments: Types.DocumentArray<CommentPopulatedDocument>;
    author: UserDocument;
}

export const Landscapes: Model<LandscapeDocument> = mongoose.model<LandscapeDocument>(
    'Landscape',
    landscapeSchema
);
