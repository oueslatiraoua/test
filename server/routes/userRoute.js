const express = require("express");
const router = express.Router();
const multer = require("multer");

//upload images multer function

const storage = multer.diskStorage({
  destination: "uploadsForUser/",

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadPicture = multer({ storage });

const { register, login } = require("../controllers/userControllers.js");
const middleware = require("../middelware/authmiddelware.js");
//const middlewarefree = require("../middelware/freelancermiddelware.js");
const validation = require("../middelware/validation.js");
router.post("/login", login);
router.post(
  "/register",
  uploadPicture.single("profilePicture"),

  register
);
router.post(
  "/register/validation",
  uploadPicture.single("profilePicture"),
  validation,
  register
);

module.exports = router;
