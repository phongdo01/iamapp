const express = require("express");
const router = express.Router();
const { getQuotes, save, deleteQuote, updateQuote} = require('../services/quoteHandler');
const cors = require('../helper/cors');
router.get("/", cors, async function (req, res, next) {
  const { query } = req;
  const quotes = await getQuotes(query);
  res.status(200).json(quotes);
});

router.post("/", cors, async function (req, res, next) {
    try {
        const quotes = await save(req.body);
        res.status(200).json(quotes);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", cors, async function (req, res, next) {
    try {
        const quotes = await deleteQuote(req.params.id);
        res.status(200).json(quotes);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send(error);
    }
});

router.put("/:id", cors, async function(req, res) {
    const {id} = req.params;
    const { category_id, content } = req.body;
    const updatedQuote = await updateQuote(id, { category_id, content });
    if (typeof updatedQuote === "string") {
        return res.status(404).json({message: updatedQuote});
    }
    res.status(200).json(updatedQuote);
})

module.exports = router;