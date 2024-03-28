const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  changePasswordInitated: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});



// middlewares //
// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// for password checking 
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatched = await bcrypt.compare(userPassword, this.password)
  return isMatched;
}


// JSON webtoken
userSchema.methods.createJWT = function () {
  return JWT.sign({ userid: this._id, email: this.email, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
