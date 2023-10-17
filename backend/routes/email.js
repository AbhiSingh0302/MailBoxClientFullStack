const express = require("express");
const emailControllers = require("../controllers/email");

const router = express.Router();

router.post("/sendmail", emailControllers.sendMail);

router.get("/getmail", emailControllers.getMail);

router.get("/message/:id", emailControllers.getMessage);

router.get("/delete-mail/:id", emailControllers.deleteMail);

module.exports = router;