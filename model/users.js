const { Schema, model } = require('mongoose');

const usersSchema = Schema(
  {
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
		},
	
  verify: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify token is required'],
  },


avatarURL: {type: String},

},
  { versionKey: false, timestamps: false },

);

const User = model('user', usersSchema);

module.exports = User;