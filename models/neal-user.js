<<<<<<< HEAD
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

=======
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

//Define User model

>>>>>>> 4b0f0680741e069ebfdcf80860c2510f7671f7ab
module.exports = mongoose.model('User', userSchema);