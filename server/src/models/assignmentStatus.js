const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentStatusSchema = new Schema({
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    },
    status: {
        type: String,
        enum: ['To be completed', 'Completed', 'Expired'],
        default: 'To be completed'
    },
    mark: {
        type: Number,
        default: 0
    },
    dateCompleted: {
        type: Date
    }
});

module.exports = assignmentStatusSchema;
