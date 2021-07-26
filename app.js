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
const composerAPI = require('./routes/neal-composer-routes');
const personAPI = require('./routes/neal-person-routes');
const nodeShopper = require('./routes/neal-node-shopper-routes');
const teamAPI =require('./routes/neal-teams')

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));


//Connect MongoDB
const conn = 'mongodb+srv://web420_user:web420@cluster0.xe3be.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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
app.use ('/api', composerAPI);
app.use ('/api', personAPI);
app.use ('/api', nodeShopper);
app.use ('/api', teamAPI);

if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//Modify applications port
app.set("port", process.env.PORT || 8080);

//Create server, listening on port 8080. Log comment to verify that application is running on port.
http.createServer(app).listen(app.get("port"), function(){
console.log("Application started and listening on port 8080!")
});