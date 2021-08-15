const express = require('express')
const router = express.Router()
const { users } = require('../../controllers')
const multer = require('multer')
const path = require('path')
const tempDir = path.join(process.cwd(), "temp")
const fs = require('fs')
const jwt = require('jsonwebtoken')
const jimp = require('jimp')

router.post('/signup', users.signup)
router.post('/login', users.login)
router.get('/logout', users.logout)
router.get('/verify/:verificationCode', users.verify)

const storageSettings = multer.diskStorage({ destination: (req, file, cb) => { cb(null, tempDir) }, filename: (req, file, cb) => cb(null, file.originalname)})
const saveToTempMiddleware = multer({ storage: storageSettings })
const resizeAndUpload = (req, res, next) => {
	const {path: tempDir } = req.file
	try {
		jimp.read(req.file.path).then(image => {
      image.resize(250, 250);
			image.write(tempDir);
		const token = req.headers.authorization.split(" ")[1];
	  const { JWT_SECRET_KEY } = process.env;
    jwt.verify(token, JWT_SECRET_KEY);
		const user = jwt.decode(token);
		const avatarDirPath = path.join(process.cwd(), 'public/avatars')
		const oldPathToFile = tempDir;
		const newPathFile = `${avatarDirPath}/${user.id}.png`
	  fs.rename(oldPathToFile, newPathFile)
		}).catch(error => {
	console.log(error.message)
		})
		next()
		} catch (error) {
		next(error)
	}
	
}
router.patch('/avatars', saveToTempMiddleware.single('avatars'), resizeAndUpload, users.avatarsUpload)

module.exports = router
