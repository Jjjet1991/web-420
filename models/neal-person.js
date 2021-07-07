/*
=====================================================
; Title: Assignment 5.2 Persons API
; Author: Professor Krasso
; Date 27 June 2021
; Modified By: Jourdan Neal
; Description: Create people API.
=====================================================
*/

//Add required libraries
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define userSchema
var personSchema = new Schema ({
  firstName:{type: String},
  lastName: {type: String},
  roles: {type: String},
  dependents: {type: String},
  birthDate: {type : String}
});


//Export Person model
module.exports = mongoose.model('Person', personSchema);