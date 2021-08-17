// const Joi = require('joi')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const { User } = require('../../model')
const { v4 } = require('uuid')
const sendCodeToEmail = require('../../helpers/sendCodeToEmail')


const signup = async (req, res) => {
	const { email, password } = req.body

	const URL = gravatar.url(email, {
  s: '200',
  r: 'pg',
  d: '404',
})
// console.log(avatarURL)
	try
	{
		const candidate = await User.findOne({ email })
		if (candidate) {
			return res.status(409).json({
				status: "error",
				code: 409,
				message: "user already registered!"
			})
		}
		const salt = bcrypt.genSaltSync(10)
		const cryptedPassword = bcrypt.hashSync(password, salt)
		const code = v4();
		const newUser = await User.create({ email, password: cryptedPassword, avatarURL: URL, verifyCode: code })
		const mail = {
			to: email,
			subject: "please, verify your email",
			text: `press next link http://localhost:3000/api/users/verify/${code} to verify your email`
		}
		await sendCodeToEmail(mail)
		res.status(200).json({email, password: newUser.password})
		
	} catch (error) {res.status(404).json({error: error.message})
		
	}
}

module.exports = signup 