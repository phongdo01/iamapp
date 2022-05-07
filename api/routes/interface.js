const multer = require("multer");
const express = require("express");
const router = express.Router();
const { getInterfaces, getInterfaceById, getIconsByCategoryAndFolder } = require("../services/interfaceHandler");
const { getIcons } = require("../services/iconHandler");
const cors = require("../helper/cors");

router.get("/", cors, async function (req, res, next) {
  const { query } = req;
  const interfaces = await getInterfaces(query);
  res.status(200).json(interfaces);
});

router.get("/categories", cors, async function (req, res, next) {
  const { query } = req;
  const interfaces = await getInterfaces(query);
  const categories = interfaces.map(item => item.category);
  res.status(200).json(categories);
});

router.get("/category/:id", cors, async function (req, res, next) {
  const interfaces = await getInterfaceById(req.params.id);
  const previews = interfaces.data.map(item => item.preview);
  res.status(200).json(previews);
});

router.get("/:categoryName/:folder", cors, async function (req, res, next) {
  const icons = await getIconsByCategoryAndFolder(req.params);
  if (icons === 404) {
    return res.status(404).send("Data not found");
  }
  res.status(200).json(icons);
});

router.get("/icons", cors, async function (req, res, next) {
  const interfaces = await getIcons(req.query);
  const previews = interfaces.map(item => item._id);
  res.status(200).json(previews);
});

module.exports = router;
