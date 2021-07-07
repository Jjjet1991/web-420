/*
=====================================================
; Title: Assignment 5.2 Persons API
; Author: Professor Krasso
; Date 27 June 2021
; Modified By: Jourdan Neal
; Description: Create people API.
=====================================================
*/

//Require statements
const express = require('express');
const router = express.Router();
const Person = require('../models/neal-person');

/*
* findAllPersons
* @openapi
* /api/persons
*   get:
*     tags:
*       - Person
*    description: API for returning a lists of Persons from MongoDB
*    summary: return list of Person documents
*    responses:
*     '200':
*       description: Array of person documents
*     '500':
*       description: Server Exception
*     '501':
*       description: MongoDB Exception
*/

router.get('/persons', async(req,res) => {
    //Wrap in try/catch block
    try {
        Person.find({}, function(err, persons) {
            if (err) {
              console.log(err),
              res.status(501).send({
                  'message' : `MongoDB Exception: ${err}`
              })
            } else {
                //Return persons list
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message' : `Server Exception ${e.message}`
        })
    }
})

/*
* createPerson
* @openapi
* /api/persons
*  post:
*    tags:
*      - Persons
*    name: createPerson
*    summary: create new Person document
*    requestBody:
*     description: Person information
*     content:
*       application/json:
*         schema:
*           required:
*             - firstName
*             - lastName
*             - roles
*             - dependents
*             - birthDate
*           properties:
*             firstName:
*               type: string
*             lastName:
*                type: string
*             roles:
*                 type: array
*                 items:
*                   type: object
*             dependents:
*                 type: array
*                 items:
*                   type: object
*              birthDate:
*                  type: string
*     responses:
*       '200':
*         description: Array of person documents
*       '500':
*         description: Server Exception
*       '501':
*          description: MongoDB Exception
*/
router.post('/persons', async(req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate,
        };

        await Person.create(newPerson, function(err, person) {
          if (err) {
              console.log(err);
              res.status(500).send({
                  'message': `Server Exception: ${err}`
              })
          } else {
              console.log(person);
              res.json(person);
          }
        })
    } catch (e) {
        console.log(e)
        res.status(501).send({
            'message' : `MongoDB Exception: ${e.message}`
        })
    }
})

//Export
module.exports = router;
