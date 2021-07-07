/*
=====================================================
; Title: Assignment 6.2 NodeSecurity
; Author: Professor Krasso
; Date 4 July 2021
; Modified By: Jourdan Neal
; Description: 
=====================================================
*/

//Require statement for mongoose
var mongoose = require('mongoose');

//Mongoose Schema object
var Schema = mongoose.Schema;

//Define userSchema
var userSchema = new Schema ({
    userName:{type: String},
    password: {type: String},
    emailAddress: {type: String}
});

module.exports = mongoose.model('User', userSchema);