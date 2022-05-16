"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const theme = mongoose.model(
  "theme",
  new Schema(
    {
      color: String,
      font_name: String,
      font_size: Number,
      background: String,
      is_customer: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = theme;
