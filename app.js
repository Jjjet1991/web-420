/*
=====================================================
; Title: Github and Project Setup
; Author: Professor Krasso
; Date 30 May 2021
; Modified By: Jourdan Neal
; Description: Github and Project Setup
=====================================================
*/

//Required libraries

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

const userAPI = require('./routes/neal-session-routes');

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));


//Connect MongoDB
const conn = 'mongodb+srv://web420_user:web420@cluster0.xe3be.mongodb.net/web420DB?retryWrites=true&w=majority';
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}) .then(() => {
  console.log('Connection to web420DB on MongoDB Atlas successful');
}). catch( err => {
  console.log(`MongoDB Error: ${error.message}`);
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB 420 REStful APIs',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*js']//
};

const openApiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));
app.use ('/api', userAPI);

http.createServer(app).listen(3000, function(){
  console.log(`Application started and listening on port ${app.get('port')}`);
});