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
var express = require('express');
var http = require('http');

//Define router variable
var router = express.Router();

//Composer model defined from composer.js
var Composer = require("../models/composer");

  //Connect to MongoDB
var mongoDB = "mongodb+srv://web420_user:web420_user@cluster0.xe3be.mongodb.net/web420DB?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
});

/*
findAllComposers

When user is directed to api/composer will display array of composers (json).
        code 200 composer list
        code 501 will respond with 'Mongo Exception'
        code 500 will respond with 'Server Exception'

        async--enables the use of try/catch block and can have zero or more await expressions
*/
router.get("/api/composers", async(request, response) => {
    try{
        Composer.find({}, function(error, composers) {
            if (error) {
                console.log(error);
                response.status(501).send({
                    'message' : `MongoDB Exception: ${error}`
                })
            } else {
                console.log(composer);
                response.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        response.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/*
findComposerById
Query id to display queried composer document (json).
        code 200 composer info
        code 501 will respond with 'Mongo Exception'
        code 500 will respond with 'Server Exception'
*/
router.get("/api/composers/:id", async(request,response) => {
  try {
      Composer.findOne({'_id': request.params.id}, function(error,response){
          if (error){
              console.log(error);
              response.status(501).send({
                  'message' : `MongoDB Exception: ${error}`
              })
          } else {
              console.log(composer);
              response.json(composer);
          }
      })    

    } catch (e) {
        console.log(e);
        response.status(500).send({
            'message': `Server Exception : ${e.message}`
        })
    } 
})
/*
createComposer
Add new composer to Database, creates new document.
        code 200 new composer document
        code 501 will respond with 'Mongo Exception'
        code 500 will respond with 'Server Exception'

        await-- pause function until promise is settled (fulfilled or rejected)
             -- will throw rejected value if promise is rejected
*/

router.post("/api/composers", async (request,response) => {
    try {
        var newComposer = {
            firstName: request.body.string,
            lastName: request.body.string
        }
    await Composer.create(newComposer, function(error,composer){
        if (error) {
            console.log(error);
            response.status(501).send({
                'message': `MongoDB Exception: ${error}`
            })
        } else {
            console.log(composer)
            response.json(composer)
        }
      })    
    } catch (e) {
        console.log (e);
        response.status(500).send({
            'message' : `Server Exception: ${e.message}`
        })
    }

})