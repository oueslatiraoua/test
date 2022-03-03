const Person = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Auth user and return Token
//@route POST /api/user/register
//@access public

const register = async (req, res) => {
  const newBody = JSON.parse(req.body.info);
  const port = process.env.PORT;
  console.log(newBody);
  try {
    const picturePath = `http://localhost:5000/uploadsForUser/${req.file.filename}`;
    console.log("picture path:", picturePath);
    const hashedPassword = await bcrypt.hash(newBody.password, 10);

    const newPerson = await Person.create({
      ...newBody,
      picture: picturePath,
      password: hashedPassword,
    });

    console.log("new person", newPerson);
    const token = jwt.sign({ id: newPerson._id }, process.env.SECRET_KEY);

    res.json({ msg: "new user", newPerson, token });
  } catch (err) {
    res.status(500).json({ msg: `something went wrong ${err}` });
  }
};

//@desc Auth user and return Token
//@route POST /api/user/login
//@access public

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existPerson = await Person.findOne({
      email,
    });
    if (!existPerson) return res.status(404).json({ msg: "Register please!" });
    const verifyPassword = await bcrypt.compare(password, existPerson.password);
    console.log(password);
    console.log(existPerson.password);
    console.log(existPerson);
    console.log("*************");
    if (!verifyPassword)
      return res.status(401).json({ msg: "Wrong password!" });
    const token = jwt.sign({ id: existPerson._id }, process.env.SECRET_KEY);

    res.json({ token, existPerson });
  } catch (err) {
    res.status(500).json({ msg: `something went wrong ${err}` });
  }
};

module.exports = { register, login };
