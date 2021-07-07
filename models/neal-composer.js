/*
=====================================================
; Title: Assignment 4.2 Composer API
; Author: Professor Krasso
; Date 20 June 2021
; Modified By: Jourdan Neal
; Description: Create composer API connected with MongooseDB Atlas.
=====================================================
*/

//Add required libraries
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create Schema
var composerSchema = new Schema({
    //Name fields
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

//Export composer model
module.exports = mongoose.model('Composer', composerSchema);