import { Schema } from 'mongoose';
import { replySchema } from './reply';

export const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        noOfReplies: {
            type: Number,
            default: 0
        },
        replies: [replySchema]
    },
    {
        timestamps: true
    }
);
