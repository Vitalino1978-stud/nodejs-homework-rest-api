const express = require('express')
const router = express.Router()
const { users } = require('../../controllers')
const multer = require('multer')
const path = require('path')
const tempDir = path.join(process.cwd(), "temp")
const fs = require('fs/promises')
console.log(tempDir)

router.post('/signup', users.signup)
router.post('/login', users.login)
router.get('/logout', users.logout)

const storageSettings = multer.diskStorage({ destination: (req, file, cb) => { cb(null, tempDir) }, filename: (req, file, cb) => cb(null, file.originalname)})
const saveToTempMiddleware = multer({ storage: storageSettings })
const resizeAndUpload = (req, res, next) => {
	const { patch } = req.file
	try {
		res.json({path, message:'from resizeAndUpload'})
	} catch (error) {
		next(error)
	}
}


router.patch('/avatars', saveToTempMiddleware.single('avatars'), resizeAndUpload, users.avatarsUpload)

module.exports = router
