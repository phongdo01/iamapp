"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const group = mongoose.model(
  "group",
  new Schema(
    {
      _id: String,
      title: String,
      categories: Schema.Types.Mixed,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = group;
