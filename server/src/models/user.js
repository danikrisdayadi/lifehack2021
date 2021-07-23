import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

import { itemSchema } from './item';
import { characterSchema } from './character';

export const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            default: ''
        },
        profilePicture: {
            location: String,
            key: String
        },
        socialPicture: {
            type: String
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        userType: {
            type: String,
            enum: ['Student', 'Teacher'],
            default: 'Student'
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        classes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Class'
            }
        ],
        assignmens: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Assignment'
            }
        ],
        coins: {
            type: Number, 
            default: 0
        },
        xp: {
            type: Number, 
            default: 0  
        },
        level: {
            type: Number, 
            default: 0  
        },
        characters: [characterSchema],
        items: [
            itemSchema
        ],
        confirmationCode: {
            type: String,
            unique: true
        },
        loginType: {
            type: String,
            enum: ['local', 'google', 'linkedin'],
            default: 'local'
        }
    },
    {
        timestamps: true
    }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export const Users = mongoose.model('User', userSchema);
