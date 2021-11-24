const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    min: 2,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 128,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
