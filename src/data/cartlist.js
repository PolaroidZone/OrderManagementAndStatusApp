const express = require('express');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    items: [{
        name: String,
        quantity: Number
    }],
    createdAt: {
        type: Date, 
        default: Date.now()
    }
});

module.exports = cartSchema
