import mongoose, { Schema } from 'mongoose';
import { commentSchema } from './comment';

export const postSchema = new Schema(
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
