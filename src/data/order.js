const express = require('express')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    item: [{name: String, quantity: Number}],
    createdAt: {
        type: Date, 
        default: Date.now() 
    }
})

module.exports = orderSchema