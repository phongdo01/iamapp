// Include mongoose module
const mongoose = require('mongoose');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
// Creating new Object of mongoose
//mongodb+srv://admin:<password>@cluster0.znbih.mongodb.net/covid?retryWrites=true&w=majority
const connection = mongoose.createConnection(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`);

// Exporting the mongoose object.
// We can use it in another file
// for creating models
module.exports = connection;
