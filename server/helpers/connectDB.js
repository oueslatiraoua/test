const mongoose = require("mongoose");

const conncetDB = () =>
  mongoose.connect(process.env.MONGO_URI, (err) =>
    err ? console.log(err) : console.log("database is connected")
  );

module.exports = conncetDB;
