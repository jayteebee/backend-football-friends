const express = require("express");

const { createUser, validateUser } = require("./controller");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(validateUser);

module.exports = router;
