const express = require("express");
const router = express.Router();
const { getQuotes, save } = require('../services/quoteHandler');
router.get("/", async function (req, res, next) {
  const { query } = req;
  const quotes = await getQuotes(query);
  res.status(200).json(quotes);
});

router.post("/", async function (req, res, next) {
    try {
        const quotes = await save(req.body);
        res.status(200).json(quotes);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;