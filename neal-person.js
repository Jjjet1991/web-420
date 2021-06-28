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

//roleSchema
var roleSchema = new Schema ({
  text: {type: String, required: true}
});

//dependantSchema
var dependantSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String}
});

//personSchema
var personSchema = new Schema({
  firstName: {type: String},
  lastName : {type: String},
  roles: [roleSchema],
  dependents: [dependantSchema],
  birthDate: {type:String}
});

//Create Person model
var Person = mongoose.model('Person', personSchema);

//Export
module.exports = Person; 