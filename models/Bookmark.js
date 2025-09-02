const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
)
const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = Bookmark