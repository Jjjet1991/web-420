/*
=====================================================
; Title: Assignment 6.2 NodeSecurity
; Author: Professor Krasso
; Date 4 July 2021
; Modified By: Jourdan Neal
; Description: Create new user and check username and password (hashed).
=====================================================
*/

/*
* create newRegisteredUser
* @openapi
* /api/signup
*  post:
*    tags:
*      - Users
*    name: Signup
*    summary: Create new users, check to make sure duplicate users are not added
*    requestBody:
*     description: 
*     content:
*       application/json:
*         schema:
*           required:
*             - userName
*             - password
*             - email
*           properties:
*             userName:
*               type: string
*             password:
*                type: string
*             email:
*                 type: string
*     responses:
*       '200':
*         description: Registered User
*       '401:
*         description: Username already in use
*       '500':
*         description: Server Exception
*       '501':
*          description: MongoDB Exception
*/

//Require statements
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/neal-user');

//saltRounds variable
const saltRounds = 10;


router.post('/signup', async(req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const newRegisteredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            email: req.body.email
        }

        User.findOne({'userName': req.body.userName}, function(err,user){
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message' : `MongoDB Exception : ${err}`
                })
            } else {
                if(!user){
                    User.create(newRegisteredUser, function(err, user) {
                        if (err) {
                            console.log(err);
                            res.status(501).send({
                                'message': `MongoDB Exception: ${err}`
                            })
                        } else {
                            console.log(user);
                            res.status(200).send({
                                'message': `Registered User`
                            })
                        }
                    })

                } else {
                    console.log(err);
                    res.status(401).send({
                        'message': 'Username is already in use'
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/*
* Verify password
* @openapi
* /api/login
*  post:
*    tags:
*      - Users
*    name: Signup
*    summary: Verify username and/or password
*    requestBody:
*     description: 
*     content:
*       application/json:
*         schema:
*           required:
*             - userName
*             - password
*             - email
*           properties:
*             userName:
*               type: string
*             password:
*                type: string
*             email:
*                 type: string
*     responses:
*       '200':
*         description: User logged in
*       '401:
*         description: Invalid username and/or password
*       '500':
*         description: Server Exception
*       '501':
*          description: MongoDB Exception
*/

router.post('/login', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user);
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    if (passwordIsValid) {
                        console.log('User logged in');
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                        console.log('Password is incorrect');
                        res.status(401).send({
                            'message': `Invalid username and/or password`
                        })
                    }
                } else {
                    console.log('Invalid user');
                    res.status(401).send({
                        'message': `Invalid username and/or password`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})


//Export
module.exports = router;