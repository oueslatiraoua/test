const mongoose = require("mongoose");

//schema of the user
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  role: {
    type: String,
    enum: ["user", "freelancer"],
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  picture: {
    type: String,
  },
  service: {
    type: String,
  },
  linkedin: {
    type: String,
  },
});
module.exports = mongoose.model("Person", userSchema);
