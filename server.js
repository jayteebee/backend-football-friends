const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const { port } = require("./Configuration/config");
const dotenv = require('dotenv');
const User = require("./Models/user");
const { AdmiredPlayer } = require("./Models/admiredPlayer");
const userRoutes = require("./Routers/users");
const authenticationRoutes = require("./Routers/authentication");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const path = require('path');





if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


// const port = process.env.EXPRESS_PORT || 5001
const port = process.env.PORT || 5001;

const localDB = 'mongodb://localhost:27017/football-friends'
const currentDB = process.env.MONGODB_URI || localDB;


// Require Passport Strategy and Options
const strategy = require("./Authentication/passportStrategy");
const jwtOptions = require("./Authentication/passportOptions");

passport.use(strategy);

const profilePictureRouter = require("./Routers/profilePicture")


const app = express();
// console.log(process.env.MONGODB_URI)
// console.log(process.env.EXPR ESS_PORT)
console.log(currentDB)
// Establish Database Connection
mongoose.connect(currentDB, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Connect to mongoDB
// mongoose.connect(currentDB);
// const db = mongoose.connection;
// db.on("error", (error) => console.log(`ERROR: ${error.message}`));
// db.on("connected", () => console.log(`MongoDB Connected: ${currentDB}`));
// db.on("disconnected", () => console.log("MongoDB Disconnected"));

// MIDDLEWARE
app.use(express.json());

const origins = ["https://football-friends.vercel.app", "football-friends-21isjh374-jayteebee.vercel.app", "football-friends-git-jb-dev-jayteebee.vercel.app" ]

app.use(cors({
  origin: "*",
  credentials: true,
}))


app.use(userRoutes);
app.use(authenticationRoutes);

// app.use(express.static(path.join(__dirname, "build")));

//TEST ROUTE
app.get(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "Hey, you can only see this message with a valid jwt",
      user: req.user,
    });
  }
);

 
// app.get('/', (req, res) => res.send('Hello, world!'));



app.use(profilePictureRouter)

// Makes the files in the uploads folder accessible through our /uploads endpoint created here
app.use("/uploads", express.static("uploads"));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", 'index.html')); // replace 'client/build' with the path to your React app's build directory
// });

app.listen(port, () => console.log(`Server started on port ${port}`));

// Test Seed Code

// const testUser = new User({
//     email: "test",
//     password: "tester"
// })

// const testAdmiredPlayer = new AdmiredPlayer({
//     name: "test2",
//     reasonAdmired: "test2"
// })
// testAdmiredPlayer.save()
// .then((res) => console.log(res))
// .catch((err) =>  console.log(err))

// testUser.playersAdmired.push(testAdmiredPlayer)
// testUser.save()
// .then((res) => console.log(res))
// .catch((err) =>  console.log(err))
