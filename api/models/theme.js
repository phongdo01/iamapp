"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const theme = mongoose.model(
  "theme",
  new Schema(
    {
      id: String,
      color: String,
      font_name: String,
      font_size: String,
      background: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = theme;
