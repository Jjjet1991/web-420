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

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Creates a new customer
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
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
/*/**
 * createInvoice
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoice
 *     summary: Adds an invoice to a customer
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer username
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Invoice added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
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