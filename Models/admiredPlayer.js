const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admiredPlayerSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  club: String,
  reasonAdmired: { type: String, required: true },
});

const AdmiredPlayer = mongoose.model("AdmiredPlayer", admiredPlayerSchema);

module.exports = { admiredPlayerSchema, AdmiredPlayer };
