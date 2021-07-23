const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = require('./question');

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        mark: {
            type: Number,
            default: 0
        },
        deadline: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['To be completed', 'Completed', 'Expired'],
            default: 'To be completed'
        },
        questions: [questionSchema]
        // author: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
    },
    {
        timestamps: true
    }
);

module.exports = assignmentSchema;
