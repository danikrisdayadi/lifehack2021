const mongoose = require('mongoose');
const commentSchema = require('./comment');
const Schema = mongoose.Schema;

const postSchema = new Schema(
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
        comments: [commentSchema]
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
