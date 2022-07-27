'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');

//...we import the function...
const ip = require('../../other.module/ip/ip_capture');

//...we import the controller...
const errorController = require('../../error.module/controller/error_controller');
const contactInsertController = require('../controller/contact_insert_controller');

//...middleware...
router.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST'],
    credentials: true
}));
router.use((req, res, next) => {
    next();
});

//...ROUTES...
//...contact form path...
router.post('/contact_insert', (req, res) => {
    try {
        contactInsertController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'CONT0001'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'CONT0001',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        }

        errorController.manager(objParameterError);
    }
});


//...we export the router...
module.exports = router;