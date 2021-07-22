import mongoose, {
    Types,
    Schema,
    Model,
    Document,
    PassportLocalDocument,
    PassportLocalModel,
    PassportLocalSchema
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

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
        resumes: [resumeSchema],
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
        city: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        interestAreas: {
            type: [String],
            enum: interestArea,
            validate: (v) => Array.isArray(v) && v.length >= 0
        },
        sustainabilityInvolvement: {
            type: [String],
            enum: involvement,
            validate: (j) => Array.isArray(j) && j.length >= 0
        },
        currentRole: {
            type: String,
            default: ''
        },
        organisationName: {
            type: String,
            default: ''
        },
        lookingFor: {
            type: [String],
            enum: lookingfor,
            validate: (k: any) => Array.isArray(k) && k.length >= 0
        },
        aboutMyself: {
            type: String,
            default: ''
        },
        skillsets: {
            type: [String],
            enum: skills,
            validate: (k: any) => Array.isArray(k) && k.length >= 0
        },
        linkedin: {
            type: String
        },
        website: {
            type: String
        },
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        followingOrgs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Organisation'
            }
        ],
        additionalInfo: {
            type: String
        },
        userType: {
            type: [String],
            enum: user,
            default: ['Community']
        },
        organisation: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Organisation'
            }
        ],
        landscapes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Landscape'
            }
        ],
        opportunities: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Opportunity'
            }
        ],
        admin: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ['Pending', 'Email Confirmed', 'Active'],
            default: 'Pending'
        },
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

export const Users = mongoose.model < UserDocument > ('User', userSchema);
