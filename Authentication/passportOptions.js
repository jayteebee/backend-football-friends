const passportJWT = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt/lib");
const extractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};

jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "mySecretKey"; //This should be read from ENV for real apps

module.exports = jwtOptions;
