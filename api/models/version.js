"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const version = mongoose.model(
  "version",
  new Schema(
    {
      version: Number
    },
    {
      timestamps: true,
    }
  )
);

module.exports = version;
