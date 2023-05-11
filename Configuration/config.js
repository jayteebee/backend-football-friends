// const dotenv = require('dotenv');
// dotenv.config()

// Creating a base name for the local MongoDB
// const mongooseBaseName = 'footballFriends';

// Create the MongoDB URI for Development and Test
// const database = {
//   development: `mongodb://localhost:27017/${mongooseBaseName}-development`,
//   test: `mongodb://localhost:27017/${mongooseBaseName}-test`
// };

// Indentify if development environment is Test or Development
// const localDB = process.env.NODE_ENV === 'test' ? database.development : database.development;
const port = process.env.EXPRESS_PORT || 5001
const localDB = 'mongodb://localhost:27017/football-friends'

// Environment variable MONGODB_URI will be avaiable in
// Heroku/Fly production environment. Otherwise use Test or
// Development database.
const currentDB = process.env.MONGODB_URI || localDB;



// Export the approprate database based on the current environment
module.exports = {currentDB, port};








// const currentDB = process.env.MONGODB_URI || localDB

// module.exports = {currentDB, localDB, port}