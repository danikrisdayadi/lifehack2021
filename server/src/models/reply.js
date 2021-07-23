import { Types, Document, Schema } from 'mongoose';

// Import User type interface
import { UserDocument } from './user';

export const replySchema = new Schema(
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
        }
    },
    {
        timestamps: true
    }
);

export interface IReply extends Document {
    upvotes: Types.ObjectId[];
    content: String;
    author: Types.ObjectId | Record<string, any>;
}

export interface ReplyDocument extends IReply {
    author: UserDocument['_id'];
}

export interface ReplyPopulatedDocument extends IReply {
    author: UserDocument;
}
