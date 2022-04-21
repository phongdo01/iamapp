const express = require('express');
const router = express.Router();

// import handler
const { getQuotes, getGroups, getThemes } = require('../services/handler');

router.get('/quotes', async function(req, res, next) {
  const { query } = req;
  const quotes = await getQuotes(query);
  res.status(200).json(quotes);
});

router.get('/groups', async function(req, res, next) {
  const { query } = req;
  const groups = await getGroups(query);
  res.status(200).json(groups);
});

router.get('/themes', async function(req, res, next) {
  const { query } = req;
  const groups = await getThemes(query);
  res.status(200).json(groups);
});

module.exports = router;
