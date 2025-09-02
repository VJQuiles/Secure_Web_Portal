const router = require('express').Router()
const bookmarkController = require('../../controllers/bookmarkController')
const verifyUser = require('../../middleware/auth')

router.use(verifyUser)

router.post('/create-bookmark', bookmarkController.createBookmark)
router.get('/user-bookmarks', bookmarkController.getAllBookmarks)
router.get('/user-bookmarks/:id', bookmarkController.getSingleBookmark)
router.put('/update-bookmark/:id', bookmarkController.updateBoookmark)
router.delete('delete-bookmark/:id', bookmarkController.deleteBookmark)