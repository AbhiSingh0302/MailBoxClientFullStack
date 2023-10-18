const express = require("express");
const emailControllers = require("../controllers/email");
const middleware = require("../middlewares/auth");

const router = express.Router();

router.post("/sendmail", middleware.verifyJWT, emailControllers.sendMail);

router.get("/getmail", middleware.verifyJWT, emailControllers.getMail);

router.get("/message/:id", middleware.verifyJWT, emailControllers.getMessage);

router.get("/delete-mail/:id", middleware.verifyJWT, emailControllers.deleteMail);

module.exports = router;