import mongoose, { Schema } from 'mongoose';

export const classSchema = new Schema(
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

export const Classes = mongoose.model < ClassDocument > ('Class', classSchema);
