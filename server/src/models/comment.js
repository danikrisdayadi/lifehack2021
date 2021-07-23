import { Document, Types, Schema } from 'mongoose';

// Import Reply Schema and Interface
import { replySchema } from './reply';
import { IReply, ReplyPopulatedDocument } from './reply';

// Import User type interface
import { UserDocument } from './user';

export const commentSchema = new Schema(
    {
        upvotes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
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

export interface IComment extends Document {
    upvotes: Types.ObjectId[];
    content: String;
    author: Types.ObjectId | Record<string, any>;
    noOfReplies: number;
    replies: Types.DocumentArray<IReply>;
}

export interface CommentDocument extends IComment {
    author: UserDocument['_id'];
}

export interface CommentPopulatedDocument extends IComment {
    author: UserDocument;
    replies: Types.DocumentArray<ReplyPopulatedDocument>;
}
