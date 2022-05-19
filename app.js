var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var rfs = require("rotating-file-stream");
require("dotenv").config();
// const jwt = require("./api/helper/jwt");
var session = require('express-session');

var indexRouter = require("./api/routes/index");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});
app.use(logger("combined", { stream: accessLogStream }));
// app.use(express.json());
const oneDay = 1000 * process.env.TTL;
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(jwt());
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
    if (err.name === "UnauthorizedError" || err.status === 401) {
    // jwt authentication error
    res.redirect("/login");
    return;
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
