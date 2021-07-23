const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema(
    {
        subject: {
            type: String,
            required: true
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        assignments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Assignment'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
