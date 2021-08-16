const { User } = require('../../model')
const sendCodeToEmail = require('../../helpers/sendCodeToEmail')

const reverify = async (req, res, next) => {
	const { email } = req.body
	try {
		if (!email) {
			res.status(400).json({ status: "error", message: "missing required field email" })
			return
		}
		const candidate = await User.findOne({ email })
		// console.log(candidate.verifyCode);
		if (candidate === true || candidate.verify === true) {
		// if (candidate?.verify === true) {
			 res.status(400).json({
				status: "error",
				code: 400,
				message: "verification has already passed, don't try to register again!"
			 })
			return
		}
		if (candidate.verify === false) {
			const mail = {
			to: email,
			subject: "please, verify your email",
			text: `press next link https://hw06-email.herokuapp.com/api/users/verify/${candidate.verifyCode} to verify your email`
		}
		await sendCodeToEmail(mail)
			res.status(200).json({message: "verification code has been send to your email succsesful"})
		}
		
	} catch (error) {
		next(error)
		
	}
}

module.exports = reverify