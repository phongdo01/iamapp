"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const group = mongoose.model(
  "group",
  new Schema(
    {
      title: String,
      categories: [],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = group;
