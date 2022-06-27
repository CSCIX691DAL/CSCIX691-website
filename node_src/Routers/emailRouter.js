const emailController = require("../Controllers/emailController")

const router = require("express").Router();

router.post("/sendEmail", emailController.sendEmail);

module.exports = router;
