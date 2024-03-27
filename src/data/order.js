const express = require("express");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  items: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = orderSchema;
