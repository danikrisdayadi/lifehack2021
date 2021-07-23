import mongoose, { Types, Schema, Model, Document } from 'mongoose';
import { commentSchema } from './comment';

const postSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        noOfComments: {
            type: Number,
            default: 0
        },
        comments: [commentSchema]
    },
    {
        timestamps: true
    }
);

export const Posts = mongoose.model < PostDocument > ('Post', postSchema);
