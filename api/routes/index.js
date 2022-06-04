const express = require("express");
const router = express.Router();

// import handler
const { getVersions } = require("../services/versionHandler");
// import admin
const admin = require("./admin");
const quotes = require("./quotes");
const themes = require("./themes");
const categories = require("./category");
const groups = require("./groups");
const interfaces = require("./interface");
const login = require("./login");

const checkAuth = function (req, res, next) {
  if (!req.session.isLogin) {
    return res.redirect("/login");
  }
  next();
};

router.use("/admin", checkAuth,  admin);
router.use("/quotes", quotes);
router.use("/themes", themes);
router.use("/categories", categories);
router.use("/groups", groups);
router.use("/interfaces", interfaces);
router.use("/login", login);
router.get("/test", function(req, res) {
  res.send("Success");
});
router.get("/", checkAuth, function(req, res) {
  res.redirect("/admin");
});

router.get("/version", async function (req, res, next) {
  const { query } = req;
  const version = await getVersions(query);
  res.status(200).json({
    version: version[0].version,
  });
});

module.exports = router;
