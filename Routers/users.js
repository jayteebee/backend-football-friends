const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// Require Passport Strategy and Options
const strategy = require("../Authentication/passportStrategy");
const jwtOptions = require("../Authentication/passportOptions");

passport.use(strategy);

const authenticateUser = passport.authenticate("jwt", { session: false });

const {
  getAllUsers,
  getOneUser,
  updateOneUser,
  createAdmiredPlayer,
  deleteAnAdmiredPlayer,
  updateAnAdmiredPlayer,
} = require("./controller");

const router = express.Router();

router.route("/Users").get(authenticateUser, getAllUsers);
router
  .route("/Users/:id")
  .get(authenticateUser, getOneUser)
  .put(authenticateUser, updateOneUser)
  .post(authenticateUser, createAdmiredPlayer);
router
  .route("/Users/:id/:playerId")
  .delete(authenticateUser, deleteAnAdmiredPlayer);
router
  .route("/Users/:id/ViewAdmiredPlayer/:playerId")
  .put(authenticateUser, updateAnAdmiredPlayer);

module.exports = router;
