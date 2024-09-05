const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const UserAvatarController = require('../controllers/UserAvatarController')

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const router = Router()
const upload = multer(uploadConfig.MULTER)


router.post('/', usersController.create)
router.put('/', ensureAuthenticated, usersController.update)
router.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = router