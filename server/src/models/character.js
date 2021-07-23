import mongoose, { Schema } from 'mongoose';

export const characterSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        picture: {
            location: String,
            key: String
        },
        price: {
            type: Number,
            required: true
        },
        unlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const Characters =
    mongoose.model < CharacterDocument > ('Character', characterSchema);
