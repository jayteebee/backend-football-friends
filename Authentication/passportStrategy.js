const User = require("../Models/user");

// Passport Strategy Package
const passportJWT = require("passport-jwt");

// Passport Options
const jwtOptions = require("./passportOptions");

// JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy;

// Dummy User for TESTING ONLY!!!
// Use Database for real use cases
const dummyUser = {
  id: "645505dd9fe91c08fb8a2ccb",
  username: "jack",
  password: "1234",
};

// This "strategy" function is going to be called every time a user makes
// a request to our API with a JSON Web Token
//
// This function is where we are going to see if the requesting user
// has a valid JWT or not. And, to see if the token is expired
const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log("Payload has been received!");
  console.log("User ID:", jwtPayload.id);
  console.log("Token expires on: ", jwtPayload.exp);

  const myUser = User.findById(jwtPayload.id)
    .then((user) => next(null, user))
    .catch(() => next(null, false));
  // Example Database Call:
  //
  // User.findById(jwtPayload.id)
  // .then(user => next(null, user)).catch(() => next(null, false))

  //   if (dummyUser.id === jwtPayload.id) {

  // If the ID is in the database,
  // then let's run our original route

  // next(null, dummyUser);

  //   } else {

  // If the ID does not exist in the database (i.e. no matches)
  // then skip our route and return a 401 error

  // next(null, false);
});
// });

module.exports = strategy;
