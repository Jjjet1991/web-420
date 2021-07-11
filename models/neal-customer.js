/*
=====================================================
; Title: Assignment 7.2 NodeShopper
; Author: Professor Krasso
; Date 11 July 2021
; Modified By: Jourdan Neal
; Description: Create customer model for NodeShopper API.
=====================================================
*/

//Add required libraries.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define lineItemSchema
var lineItemSchema = new Schema ({
    name: {type: String},
    price: {type: String},
    quantity: {type: String}
});

//Define invoice Schema
var invoiceSchema = new Schema ({
    subtotal : {type: Number},
    tax: {type: Number},
    dateCreated: {type: String},
    dateShipped: {type: String},
    lineItems: [lineItemSchema]
});

//Define customerSchema
var customerSchema = new Schema ({
    firstName : {type: String},
    lastName : {type: String},
    userName : {type: String},
    invoices: [invoiceSchema]
});

//Export the model
module.exports = mongoose.model('Customer', customerSchema);