const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema(
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

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
