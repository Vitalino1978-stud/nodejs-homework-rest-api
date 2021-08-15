const nodemailer = require('nodemailer')
require("dotenv").config()

const { USER, PASS } = process.env
const config = {
	service: 'gmail',
	auth: {
		user: `${USER}`,
		pass: `${PASS}`
	}
}

const transporter = nodemailer.createTransport(config)

const sendCodeToEmail = async ({ to, subject, text }) => {
	const mail = {
		from: `${USER}`,
		to,
		subject,
		text
	}

	try {
		const answer = await transporter.sendMail(mail)
		return answer
	}
	catch (error) {
		throw new Error( "error. ta prosto error")
	}
}

module.exports = sendCodeToEmail
