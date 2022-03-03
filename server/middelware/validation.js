const { body } = require("express-validator");
//***********freelancer validation info (not required for a simple user )
const validation = [body("picture").exists(), body("service").exists()];

module.exports = validation;
