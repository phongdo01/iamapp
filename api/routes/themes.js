const multer = require('multer');
const express = require("express");
const router = express.Router();
const { getThemes, save, deleteTheme} = require('../services/themeHandler');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
const upload = multer({ storage: storage });
// const upload = multer({ dest: './public/images' })

router.get("/", async function (req, res, next) {
  const { query } = req;
  const themes = await getThemes(query);
  res.status(200).json(themes);
});

router.post("/",upload.single('background'), async function (req, res, next) {
    try {
      const {color, font_name, font_size} = req.body;
      const background = req.file.filename;
      const file = req.file
      if (!file) {
        const error = new Error('Please upload a file')
        res.status(400).send(error);
      }
        const themes = await save({color, font_name, font_size, background});
        res.status(200).json(themes);
    } catch (error) {
        console.log('error:', error);
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