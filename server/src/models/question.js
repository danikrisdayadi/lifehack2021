import mongoose, { Schema } from 'mongoose';

export const questionSchema = new Schema(
    {
        content: {
            type: String
        },
        image: {
            location: String,
            key: String
        },
        answer: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Questions =
    mongoose.model < QuestionDocument > ('Question', questionSchema);
