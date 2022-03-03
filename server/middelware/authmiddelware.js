const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  try {
    const verifyToken = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    req.userId = verifyToken.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: `invalid token${err}` });
  }
};
module.exports = middleware;
