const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { admiredPlayerSchema } = require("./admiredPlayer");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String },
  profileName: { type: String, default: "New User" },
  location: { type: String },
  age: { type: Number },
  favouriteTeam: { type: String },
  profilePicturePath: { type: String },
  playersAdmired: [{ type: admiredPlayerSchema }],
  likesReceived: [String],
  likesSent: [String],
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
