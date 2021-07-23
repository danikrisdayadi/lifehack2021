const mongoose = require('mongoose');
const replySchema = require('./reply');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
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
        replies: [replySchema]
    },
    {
        timestamps: true
    }
);

module.exports = commentSchema;
