const express = require("express");
const router = express.Router();
const upload = require("../Utilities/upload");
const sharp = require("sharp");
const User = require("../Models/user");
const passport = require("passport");

const profilePictureUpload = async (req, res) => {
  try {
    // Resizing the user uploaded file
    // Multer automatically generates file.path upon upload
    const resizedImage = await sharp(req.file.path)
      .resize(250, 250, { fit: "cover" })
      .toBuffer();
    // Save resized umage, remove original
    await sharp(resizedImage).toFile(req.file.path);
    // will this have to have authentication involved? EG web token validation etc

    const user = await User.findById("req.body.userID");
    if (user) {
      // update key with path of pic
      user.profilePicturePath = req.file.path;
      await user.save();
    } else {
      throw new Error("User not found");
    } 
    // response to client
    res.status(200).send({ imagePath: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error uploading the profile picture." });
  }
};

router.route("/uploadProfilePicture").post(
  passport.authenticate("jwt", {session: false}),

  upload.single("profilePicture"), 
  profilePictureUpload);
module.exports = router;


// // Define the POST route, use upload.single middleware to handle the file upload 
// // according to the Multer config detailed in upload.js
// // profilePicture argument is the field name used in the form-data when sending the file from the client-side
// router.post("/uploadProfilePicture", upload.single("profilePicture"), async (req,res) => {
//     try {
//         // Resizing the user uploaded file
//         // Multer automatically generates file.path upon upload
//         const resizedImage = await sharp(req.file.path)
//         .resize(250, 250, {fit: "cover"})
//         .toBuffer()

//         // Save resized umage, remove original
//         await sharp(resizedImage).toFile(req.file.path);

//         // will this have to have authentication involved? EG web token validation etc
//             const user = await User.findById(userId)
//             if (user) {
//                 // update key with path of pic
//                 user.profilePicturePath = req.file.path;
//                 await user.save();
//             } else {
//                 throw new Error("User not found")
//             }
//             // response to client
//             res.status(200).send({imagePath: req.file.path})
//     } catch (error) {
//         console.error(error);
//     res.status(400).send({ error: 'Error uploading the profile picture.' });
//     }
// })




// 6457cbe8fd85550788db11f1