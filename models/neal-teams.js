/*
=====================================================
; Title: Assignment 9 Capstone
; Author: Professor Krasso
; Date 25 July 2021
; Modified By: Jourdan Neal
; Description: Create Team API to get player/mascot info. 
=====================================================
*/

//Add required libraries.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define player schema
var playerSchema =  new Schema({
    firstName: {type: String},
    lastName: {type: String},
    salary: {type: Number}
});

//Define teamSchema
var teamSchema = new Schema({
    id: {type: String},
    name: {type: String},
    mascot: {type: String},
    players: [playerSchema]
});



//Export Person model
module.exports = mongoose.model('Team', teamSchema);