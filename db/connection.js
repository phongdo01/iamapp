// Include mongoose module
const mongoose = require('mongoose');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
// Creating new Object of mongoose
//mongodb+srv://admin:<password>@cluster0.znbih.mongodb.net/covid?retryWrites=true&w=majority
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`;
const connection = mongoose.createConnection(url);
// postgres://db:5432

// Exporting the mongoose object.
// We can use it in another file
// for creating models
module.exports = connection;
