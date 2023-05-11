const express = require("express");
const User = require("../Models/user");
const { AdmiredPlayer } = require("../Models/admiredPlayer");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../Authentication/passportOptions");

const router = express.Router();

/******* USER FUNCTIONS *******/

// INDEX
const getAllUsers = async (req, res) => {
  try {
    allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get One User
const getOneUser = async (req, res) => {
  try {
    user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Create One User
const createUser = async (req, res) => {
  try {
    duplicateUser = await User.find({ email: req.body.email });
    console.log(duplicateUser);
    if ((duplicateUser.length = 0)) {
      res.status(409).json({ error: "This email is already in use" });
    } else {
      new_user = await User.create(req.body);
      new_user.password = new_user.generateHash(req.body.password);
      new_user.save();
      res.status(201).json(new_user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Update a User
const updateOneUser = async (req, res) => {
  try {
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Validate a User upon Login

//NEED TO EDIT THE ERROR MESSAGE TO NOT DISPLAY WHICH PART WAS ACC WRONG (email or password)

const validateUser = async (req, res) => {
  console.log("random", req)
  try {
    if (req.body.email && req.body.password) {
      myUser = await User.findOne({ email: req.body.email });
      if (!myUser) {
        res.json({ error: "No user found with that email" });
      }
      if (!myUser.validPassword(req.body.password)) {
        res.json({ error: "Password did not match" });
      } else {
        // Build a JSON Web Token using the payload
        const payload = {
          id: myUser._id,
          username: myUser.email,
        };
        const token = jwt.sign(payload, jwtOptions.secretOrKey, {
          expiresIn: 100000,
        });
        res.json({
          success: "The password matched",
          token: token,
          userID: myUser._id,
          profileName: myUser.profileName,
        });
      }
    } else {
      res.status(400).json({ error: "Email & Password Required" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/******** ADMIRED PLAYER METHODS ********/

// Create One Admired Player
const createAdmiredPlayer = async (req, res) => {
  try {
    new_player = await AdmiredPlayer.create(req.body);
    our_user = await User.findById(req.params.id);
    our_user.playersAdmired.push(new_player);
    our_user.save();
    res.status(201).json(our_user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete an admired player
const deleteAnAdmiredPlayer = async (req, res) => {
  try {
    updatedUser = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          playersAdmired: { _id: req.params.playerId },
        },
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update an admired player
// /Users/:id/ViewAdmiredPlayer/:playerId
const updateAnAdmiredPlayer = async (req, res) => {
  try {
    updatedPlayer = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        "playersAdmired._id": {
          _id: req.params.playerId,
        },
      },
      {
        $set: {
          "playersAdmired.$.name": req.body.name,
          "playersAdmired.$.age": req.body.age,
          "playersAdmired.$.club": req.body.club,
          "playersAdmired.$.reasonAdmired": req.body.reasonAdmired,
        },
      },
      { returnDocument: "after" }
    );
    res.status(201).json(updatedPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateOneUser,
  createAdmiredPlayer,
  deleteAnAdmiredPlayer,
  deleteAnAdmiredPlayer,
  updateAnAdmiredPlayer,
  validateUser,
};

// update an admired player
// /Users/:id/ViewAdmiredPlayer/:playerId

// const updateAnAdmiredPlayer = async (req, res) => {
//   try {
//     ourUser = await User.findById(req.params.id);
//     console.log("OUR USER:  ", ourUser);
//     ourPlayer = ourUser.playersAdmired.id(req.params.playerId);
//     console.log("OUR PLAYER:   ", ourPlayer);
//     playerIndex = { $indexOfArray: [ourUser.playersAdmired, ourPlayer] };
//     console.log("PLAYER INDEX:    ", playerIndex);
//     updatedPlayer = { ...ourUser.playersAdmired[playerIndex], ...req.body };
//     ourUser.playersAdmired.splice(playerIndex, 1, updatedPlayer);
//     ourUser.save();
//     if (!ourUser) throw new Error();
//     res.status(200).json({ message: "item not found" });
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({ message: "something went wrong" });
//   }
// };
