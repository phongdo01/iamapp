const express = require("express");
const router = express.Router();
const { getThemes, save, deleteTheme} = require('../services/themeHandler');

router.get("/", async function (req, res, next) {
  const { query } = req;
  const themes = await getThemes(query);
  res.status(200).json(themes);
});

router.post("/", async function (req, res, next) {
    try {
        const themes = await save(req.body);
        res.status(200).json(themes);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", async function (req, res, next) {
    try {
        const themes = await deleteTheme(req.params.id);
        res.status(200).json(themes);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send(error);
    }
});

module.exports = router;