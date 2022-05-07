"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

module.exports = mongoose.model(
  "interface",
  new Schema(
    {
      category: String,
      type: String,
      data: [
        {
          fodel: String,
          preview: String,
          themeBackground: String,
          bottomViewBackground: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
