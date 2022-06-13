const authController = require("../Controllers/authController")


const router = require("express").Router();

router.get("/test",authController.testAuth);

module.exports = router;
