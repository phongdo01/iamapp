const multer = require("multer");
const express = require("express");
const router = express.Router();
const { getThemes, save, deleteTheme } = require("../services/themeHandler");
const cors = require("../helper/cors");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!whitelist.includes(file.mimetype.toLocaleLowerCase())) {
      req.fileValidationError = "goes wrong on the mimetype";
      return cb(null, false, new Error('goes wrong on the mimetype'));
    }

    cb(null, true);
  },
});
// const upload = multer({ dest: './public/images' })

router.get("/", cors, async function (req, res, next) {
  const { query } = req;
  const themes = await getThemes(query);
  res.status(200).json(themes);
});

router.post(
  "/",
  [cors, upload.single("background")],
  async function (req, res, next) {
    try {
      if (req.fileValidationError) {
        return res.end(req.fileValidationError);
      }
      const { color, font_name, font_size } = req.body;
      const background = req.file.filename;
      const file = req.file;
      if (!file) {
        const error = new Error("Please upload a file");
        res.status(400).send(error);
      }
      const themes = await save({ color, font_name, font_size, background });
      res.status(200).json(themes);
    } catch (error) {
      console.log("error:", error);
      res.status(400).send(error);
    }
  }
);

router.delete("/:id", cors, async function (req, res, next) {
  try {
    const themes = await deleteTheme(req.params.id);
    res.status(200).json(themes);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send(error);
  }
});

module.exports = router;
