const multer = require("multer");
const express = require("express");
const router = express.Router();
const { getInterfaces, getInterfaceById } = require("../services/interfaceHandler");
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

router.delete("/:id", cors, async function (req, res, next) {
  try {
    const interfaces = await deleteTheme(req.params.id);
    res.status(200).json(interfaces);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send(error);
  }
});

module.exports = router;
