"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const theme = mongoose.model(
  "theme",
  new Schema(
    {
      _id: String,
      color: String,
      font_name: String,
      font_size: Number,
      background: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = theme;
