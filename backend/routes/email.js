const express = require("express");
const emailControllers = require("../controllers/email");

const router = express.Router();

router.post("/sendmail", emailControllers.sendMail);

module.exports = router;