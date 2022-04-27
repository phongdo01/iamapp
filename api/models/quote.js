"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const quote = mongoose.model(
  "quote",
  new Schema(
    {
      // _id: String,
      category_id: String,
      content: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = quote;
