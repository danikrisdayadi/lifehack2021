const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        content: {
            type: String
        },
        image: {
            location: String,
            key: String
        },
        options: [
            {
                type: String
            }
        ],
        answer: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = questionSchema;
