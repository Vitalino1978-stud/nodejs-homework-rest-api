const { User } = require('../../model')

const verify = async (req, res, next) => {

	try {
		const candidate = await User.findOne({ verifyCode: req.params.verificationCode })
			if (!candidate) {
			return
			res.status(404).json({message: "verify code has been expired"})
		}

		await User.findByIdAndUpdate(candidate._id, { verifyCode: "", verify: true})
		res.json({ message: "email is verified" })
		
	}
	catch (error) {
		next(error)
	}


}
module.exports = verify