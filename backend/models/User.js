const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, minlength: 3 }
  },
  email: { type: String, required: true, unique: true, minlength: 5 },
  password: { type: String, required: true, select: false },
  socketId: { type: String }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);
