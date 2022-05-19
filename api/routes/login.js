const express = require("express");
const router = express.Router();
const cors = require("../helper/cors");
const loginHandler = require("../services/loginHandler");

router.get("/", cors, async function (req, res, next) {
  res.render("login");
});

router.post("/", cors, async function (req, res, next) {
  try {
    const { username, password } = req.body;
    loginHandler.authenticate({ username, password });
    req.session.isLogin = true;
    res.redirect("/admin");
  } catch (error) {
    res.redirect("/login");
  }
});

module.exports = router;
