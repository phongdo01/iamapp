"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const icon = mongoose.model(
  "icon",
  new Schema(
    {
      appIcon: String,
      appScheme: String,
      appDefault: String,
      appName: String
    },
    {
      timestamps: true,
    }
  )
);

module.exports = icon;
