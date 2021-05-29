/*
=====================================================
; Title: Github and Project Setup
; Author: Professor Krasso
; Date 30 May 2021
; Modified By: Jourdan Neal
; Description: Github and Project Setup
=====================================================
*/

//Import required libraries.
import http from 'http';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import mongoose from 'mongoose';

//Create new variable app and assign it to the express library.
var app = express();
//Set port
var port = process.env.PORT || 3000;
//Set app to use express.json()
app.use(express.json());
//Set app to use urlencoded
app.use(express.urlencoded({extended:true}));

//Define options object literal
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'WEB 420 RESTful APIs',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.js'], // files containing annotations as above
  };
  

//Create new openapiSpecification variable and call swaggerJsdoc

const openapiSpecification = swaggerJsdoc(options);
//Wire the openapiSpecification variable to the app variable

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
//Use http library to create new server listening on port 3000.
http.createServer(app).listen(port, function(){
    console.log('Application started and listening on port 3000.')
})

