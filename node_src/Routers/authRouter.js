const authController = require("../Controllers/authController")


const router = require("express").Router();

router.post("/authentication",authController.authentication);

module.exports = router;
