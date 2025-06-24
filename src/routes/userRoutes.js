const express = require("express");
const userController = require("../controllers/userController");
const { loginValidation } = require("../validations/loginUserValidation");
const { registerValidation } = require("../validations/registerUserValidation");

const router = express.Router();

router.post("/signup", registerValidation, userController.register);
router.post("/login", loginValidation, userController.login);

module.exports = router;
