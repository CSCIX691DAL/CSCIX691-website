/*
 * The router page for everything
 *  Auth: Hansheng Li
 *  Date: 13th Jun 2022
 *
 */

const router = require("express").Router();

const auth_router = require("./authRouter");
const email_router = require("./emailRouter");

router.use("/auth", auth_router);
router.use("/email", email_router);

module.exports = router;
