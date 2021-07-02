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

/**
* findAllComposers
* @openapi
* /api/composers
* get:
*  tags:
*    -Composers
*  description: API for returning array of composers.
*  summary: When user is directed to api/composer will display array of composers (json).
*  responses:
*       '200':
*         description: composer list.
*       '501':
*          description: will respond with 'Mongo Exception'.
*       '500' :
*          description: will respond with 'Server Exception'.
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
* findComposerById
* @openapi
* /api/composers/:id
* get:
*  tags:
*    -Composers
*  description: API for returning a composer document
*  summary: query id to display queried composer document (json).
*  responses:
*      '200':
*         description: Composer document
*      '501'
*         description: will respond with 'Mongo Exception'.
*      '500' 
*         description: will respond with 'Server Exception'.
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
* createComposer
* @openapi
* /api/composers
* post:
*  tags:
*    -Composers
*  name: createComposer
*  description: API for adding new composer document
*  summary: Creates new composer document.
*  requestBody:
*    description: Composer information
*    content:
*      application/json:
*        schema:
*          required:
*            -type
*          properties:
*            type:
*              type: strings
*  responses:
*      '200':
*         description: Composer added
*      '501'
*         description: will respond with 'Mongo Exception'.
*      '500' 
*         description: will respond with 'Server Exception'.
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