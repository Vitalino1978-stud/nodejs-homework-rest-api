const express = require('express')
const router = express.Router()
const { users } = require('../../controllers')
const multer = require('multer')
const path = require('path')
const tempDir = path.join(process.cwd(), "temp")

router.post('/signup', users.signup)
router.post('/login', users.login)
router.get('/logout', users.logout)

const storageSettings = multer.diskStorage({ destination: (req, file, cb) => { cb(null, tempDir) }, filename: (req, file, cb) => { null, file.originalname } })
const saveToTempMiddleware = multer({ storage: storageSettings })
router.patch('/avatars', saveToTempMiddleware.single('avatar'), users.avatarsUpload)

module.exports = router
