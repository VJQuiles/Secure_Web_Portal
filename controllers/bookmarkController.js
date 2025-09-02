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
        ///////////////////////
        console.log(bookmarks)
    } catch (error) {
        res.status(500).json({ error: `Error getting all bookmarks, ${error.message}` })
    }
}

async function getSingleBookmark(req, res) {
    try {
        const bookmark = await Bookmark.findById(req.params.id)
        res.json(bookmark)
        //////////////////
        console.log(bookmark)
    } catch (error) {
        res.status(500).json({ error: `Error getting desired bookmark, ${error.message}` })
    }
}

async function updateBookmark(req, res) {
    try {
        const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!bookmark) return res.status(404).json({ message: `No bookmark with id: ${id}` })
        res.json(bookmark)
        //////////////////
        console.log(bookmark)
    } catch (error) {
        res.status(500).json({ error: `Error updating desired bookmark, ${error.message}` })
    }
}

async function deleteBookmark(req, res) {
    try {
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id)
        if (!bookmark) return res.status(404).json({ message: `No bookmark with id: ${id}` })
        res.json({ message: `${bookmark.title} successfully deleted` })
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