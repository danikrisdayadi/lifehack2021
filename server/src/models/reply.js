import { Schema } from 'mongoose';

export const replySchema = new Schema(
    {
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

export const Replies = mongoose.model < ReplyDocument > ('Reply', replySchema);
