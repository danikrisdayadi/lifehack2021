const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const itemSchema = require('./item');
const characterSchema = require('./character');

const userSchema = new Schema(
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
        classrooms: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Classroom'
            }
        ],
        assignments: [
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
        items: [itemSchema],
        confirmationCode: {
            type: String,
            unique: true
        },
        loginType: {
            type: String,
            enum: ['local', 'google', 'linkedin'],
            default: 'local'
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', userSchema);

module.exports = User;
