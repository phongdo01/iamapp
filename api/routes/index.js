const express = require('express');
const router = express.Router();

// import handler
const { getQuotes, getGroups, getThemes, getCategories, getVersions } = require('../services/handler');

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

router.get('/categories', async function(req, res, next) {
  const { query } = req;
  const categories = await getCategories(query);
  res.status(200).json(categories);
});

router.get('/version', async function(req, res, next) {
  const { query } = req;
  const version = await getVersions(query);
  console.log('_id: ', version[0]._id);
  res.status(200).json({
    version: version[0].version
  });
});

module.exports = router;
