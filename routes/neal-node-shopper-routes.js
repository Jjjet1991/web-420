/*
=====================================================
; Title: Assignment 7.2 NodeShopper 
; Author: Professor Krasso
; Date 11 July 2021
; Modified By: Jourdan Neal
; Description: NodeShopper API. 
=====================================================
*/

//Require statements
const express = require('express');
const router = express.Router();
const Customer = require('../models/neal-customer.js');

/*
* createCustomer
* @openapi
* /api/customers
*  post:
*    tags:
*      - Customers
*    name: createCustomer
*    summary: create new Customer document
*    requestBody:
*     description: Customer information
*     content:
*       application/json:
*         schema:
*           required:
*             - firstName
*             - lastName
*             - userName
*             - invoices
*           properties:
*             firstName:
*               type: string
*             lastName:
*                type: string
*             userName:
*                   type: string
*             invoices:
*                 type: array
*                 items: invoiceSchema
*     responses:
*       '200':
*         description: Customer added to MongoDB
*       '500':
*         description: Server Exception
*       '501':
*          description: MongoDB Exception
*/

router.post('/customers', async (req,res) => {
    try{
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };

    await Customer.create(newCustomer, function(err, customer){
            if (err) {
                console.log(err);
                res.status(500).send({
                    "message": `Server Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.status(200).send({
                    'message': `Customer added to MongoDB`
                })
            }
        })
    } catch (e) {
        console.log(e);
        res.status(501).send ({
            'message': `MongoDB Exception: ${e.message}`
        })
    }
})

//-------------------------------------------------------------------------------------------//
/*
* createInvoiceByUserName
* @openapi
* /api/customers/:userName/invoices
*  post:
*    tags:
*      - Customers
*    name: createInvoicesByUserName
*    summary: Create invoices after looking up document by userName
*    requestBody:
*     description: userName and invoice information
*     content:
*       application/json:
*         schema:
*           required:
*             - userName
*             - subtotal
*             - tax
*             - dateCreated
*             - dateShipped
*             - lineItems
*           properties:
*             userName:
*               type: string
*             subtotal:
*                type: string
*             tax:
*                   type: string
*             dateCreated:
*                   type: string
*             dateShipped:
*                   type: string
*             lineItems:
*                 type: array
*                 items: lineItem objects
*     responses:
*       '200':
*         description: Customer added to MongoDB
*       '500':
*         description: Server Exception
*       '501':
*          description: MongoDB Exception
*/

router.post('/customers/:userName/invoices', async(req,res) => {
    try {
        Customer.findOne({'userName' :req.params.userName}, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message' : `Server Exception ${err}`});
            } else {
                console.log(customer);
                res.status(200).send({
                    'message' : 'Customer added to MongoDB'
                });

                const newInvoice = {
                    userName: req.params.userName,
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                }

                customer.invoices.push(newInvoice);
                customer.save()
            }
        })
    } catch (e) {
        console.log(e);
        res.status(501).send({
            'message' : `MongoDB Exception ${e.message}`
        })
    }
})

//-------------------------------------------------------------------------------------------//
/*
* findAllInvoicesByUserName
* @openapi
* /api/customers/:userName/invoices
*  get:
*    tags:
*      - Customers
*    name:  findAllInvoicesByUserName
*    summary: Display all invoices associated with userName
*    requestBody:
*     description: display all invoice information
*     content:
*       application/json:
*         params:
*           required:
*             - userName
*     responses:
*       '200':
*         description: Customer added to MongoDB
*       '500':
*         description: Server Exception
*       '501':
*          description: MongoDB Exception
*/

router.get('/customers/:userName/invoices', async(req,res) => {
    try{
        Customer.findOne({'userName': req.params.userName}, function(err,customer) {
            if(err) {
                console.log(err);
                res.status(500).send({
                    'message' : `Server Exception ${err}`
                })
            } else {
                console.log(customer);
                res.status(200).send (customer.invoices)
            }
        })
    } catch (e) {
        console.log(e);
        res.status(501).send({
            'message' : `MongoDB Exception ${e.message}`
        })
    }
})

//Export
module.exports = router;