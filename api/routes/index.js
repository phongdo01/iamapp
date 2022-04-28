const express = require('express');
const router = express.Router();

// import handler
const { getQuotes, getGroups, getThemes, getCategories, getVersions } = require('../services/handler');
// import admin
const admin = require('./admin');
const quotes = require('./quotes');
const themes = require('./themes');
const categories = require('./category');
const groups = require('./groups');

router.use('/admin', admin);
router.use('/quotes', quotes);
router.use('/themes', themes);
router.use('/categories', categories);
router.use('/groups', groups);

// router.get('/groups', async function(req, res, next) {
//   const { query } = req;
//   const groups = await getGroups(query);
//   res.status(200).json(groups);
// });

// router.get('/themes', async function(req, res, next) {
//   const { query } = req;
//   const groups = await getThemes(query);
//   res.status(200).json(groups);
// });

// router.get('/categories', async function(req, res, next) {
//   const { query } = req;
//   const categories = await getCategories(query);
//   res.status(200).json(categories);
// });

router.get('/version', async function(req, res, next) {
  const { query } = req;
  const version = await getVersions(query);
  console.log('_id: ', version[0]._id);
  res.status(200).json({
    version: version[0].version
  });
});

module.exports = router;
