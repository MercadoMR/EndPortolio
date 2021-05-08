const mongoose = require('mongoose')
// Define the database comment Schema
const commentSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        // Assigns createdAt and updatedAt fields with a Date type
        timestamps: true
    }
)
// Define the model inside the commentSchema
const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment

