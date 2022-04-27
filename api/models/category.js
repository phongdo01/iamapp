"use strict";
const { Schema } = require("mongoose");
const mongoose = require("../../db/connection");

const category = mongoose.model(
  "category",
  new Schema(
    {
      title: String,
      is_lock: {type: Boolean, default: false},
      is_default: {type: Boolean, default: false},
      theme: Schema.Types.Mixed,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = category;
