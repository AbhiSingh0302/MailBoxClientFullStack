const express = require("express");
const {auth,verifyAuth} = require("../middlewares/auth");
const usersControllers = require("../controllers/users");

const router = express.Router();

router.post("/signup", auth, usersControllers.signup);

router.post("/login", verifyAuth, usersControllers.login);

module.exports = router;