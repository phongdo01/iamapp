// Include mongoose module
const mongoose = require('mongoose');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
console.log('pong: ', DB_NAME);
console.log('pong: ', DB_USER);
console.log('pong: ', DB_PASS);
console.log('host: ', DB_HOST);
// Creating new Object of mongoose
//mongodb+srv://admin:<password>@cluster0.znbih.mongodb.net/covid?retryWrites=true&w=majority
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?authSource=admin`;
console.log(url);
const connection = mongoose.createConnection(url);
// postgres://db:5432

// Exporting the mongoose object.
// We can use it in another file
// for creating models
module.exports = connection;
