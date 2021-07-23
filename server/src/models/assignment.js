import mongoose, { Schema } from 'mongoose';

export const assignmentSchema = new Schema(
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
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Question'
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Assignments =
    mongoose.model < AssignmentDocument > ('Assignment', assignmentSchema);
