const Bookmark = require('../models/Bookmark')

async function createBookmark(req, res) {
    try {
        const bookmark = await Bookmark.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json(bookmark)
        console.log(bookmark)
    } catch (error) {
        res.status(400).json({ error: `Error creating bookmark, ${error.message}` })
    }
}

async function getAllBookmarks(req, res) {
    try {
        const bookmarks = await Bookmark.find({ user: req.user._id })
        res.json(bookmarks)
        console.log(bookmarks)
    } catch (error) {
        res.status(500).json({ error: `Error getting all bookmarks, ${error.message}` })
    }
}

async function getSingleBookmark(req, res) {
    try {

    } catch (error) {
        res.status(500).json({ error: `Error getting desired bookmark, ${error.message}` })
    }
}

async function updateBookmark(req, res) {
    try {

    } catch (error) {
        res.status(500).json({ error: `Error updating desired bookmark, ${error.message}` })
    }
}

async function deleteBookmark(req, res) {
    try {

    } catch (error) {
        res.status(500).json({ error: `Error deleting desired bookmark, ${error.message}` })
    }
}

module.exports = {
    createBookmark,
    getAllBookmarks,
    getSingleBookmark,
    updateBookmark,
    deleteBookmark
}