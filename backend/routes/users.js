const express = require("express");
const auth = require("../middlewares/auth");
const usersControllers = require("../controllers/users");

const router = express.Router();

router.post("/signup", auth, usersControllers.signup);

module.exports = router;