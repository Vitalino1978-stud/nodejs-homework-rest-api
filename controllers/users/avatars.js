// const bcrypt = require('bcrypt')
const { User } = require('../../model') 
const jwt = require('jsonwebtoken')

const avatarsUpload = async (req, res, next) => {
	// const { email, password } = req.body
	// const result = await User.findOneAndUpdate({_id: contactId}, {...req.body}, {new: true})
// 
// const {path}= req.file
try {
	const token = req.headers.authorization.split(" ")[1];
	const { JWT_SECRET_KEY } = process.env;
    jwt.verify(token, JWT_SECRET_KEY);
    const user = jwt.decode(token);
	// console.log(user)
	const updateAvatar = await User.findOneAndUpdate({_id: user.id}, {avatarURL: "noImage"}, {new: true} )
	console.log(updateAvatar)
	res.json({avatarURL: "noImage"})
	
}
catch (error) {next (error)}
		
}
module.exports = avatarsUpload