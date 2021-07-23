const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assignmentSchema = require('./assignment');

const classroomSchema = new Schema(
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
        assignments: [assignmentSchema]
    },
    {
        timestamps: true
    }
);

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;
