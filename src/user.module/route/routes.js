'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../other/token/jwt');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');

//...we imports the controllers...
const errorController = require('../../error.module/controller/error_controller');
const userRegisterController = require('../controller/user_register_controller');
const userRegisterConfirmController = require('../controller/user_register_confirm_controller');
const userRegisterCodeRecoveryController = require('../controller/user_register_code_recovery_controller');
const userRecoveryController = require('../controller/user_recovery_controller');
const userRecoveryConfirmController = require('../controller/user_recovery_confirm_controller');
const userRecoveryChangeController = require('../controller/user_recovery_change_controller');
const userLoginEmailController = require('../controller/user_login_email_controller');
const userLoginPassController = require('../controller/user_login_pass_controller');
const userModifyProfileController = require('../controller/user_modify_profile_controller');

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
//...user register...
router.post('/user_register', (req, res) => {
    try {
        userRegisterController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0001'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0001',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});

//...user registration confirmation...
router.post('/user_register_confirm', (req, res) => {
    try {
        userRegisterConfirmController.manager(req, res);
    }
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0030'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0030',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});

//...
router.post('/user_register_code_recovery', (req, res) => {
    try {
        userRegisterCodeRecoveryController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0054'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0054',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});

//...password recovery...
router.post('/user_recovery', (req, res) => {
    try {
        userRecoveryController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0065'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0065',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});

//...
router.post('/user_recovery_confirm', (req, res) => {
    try {
        userRecoveryConfirmController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0077'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0077',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});

//...
router.post('/user_recovery_change', (req, res) => {
    try {
        userRecoveryChangeController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0084'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0084',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});

//...
router.post('/user_login_email', (req, res) => {
    try {
        userLoginEmailController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0103'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0103',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});

//...
router.post('/user_login_pass', (req, res) => {
    try {
        userLoginPassController.manager(req, res);
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0110'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0110',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});


//...functions with token........................................

//...función para validación de token...
//...nos aseguramos que le token fue creado en el momento en el que el usuario se logueó...
//...middleware...

const verifyToken = (req, res, next) => {
    //...información que llega por la cabecera de la petición...
    //...la almacenamos en una constante...
    //...comprobamos si existe una cabecera "authorization" en la información que nos envía el navegador en su cabecera...

    const bearerHeaders = req.headers['authorization'];

    if (typeof bearerHeaders !== 'undefined'){
        const bearer = bearerHeaders.split(' ');

        //...guardamos el token...
        const bearerToken = bearer[1];
        req.userToken = bearerToken;

        //...necesitamos agregar esta sentencia porque es un middleware...
        next();
    }
    else {
        //...enviamos el código al cliente...
        //...es mensaje se envía porque el token fue incorrecto...
        //...la cabecera "authorization" no existe o su valor está indefinido...
        res.json(JSON.stringify({code: 'USER0122'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0122',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
}

//...
router.post('/user_modify_profile', verifyToken, (req, res) => {
    try {
        //...verificamos el token, incluyendo la clave privada...
        //...también incluimos un callback...
        //..."data" es la información a devolver, aunque en nuestro desarrollo no devolvemos datos...
        //...req.body.userToken.trim()
        jwt.verify(req.userToken, jwtSecret.secret, (err, data) => {
            if (err){
                //...el token no coincide...
                res.json(JSON.stringify({code: 'USER0123'}));
            }
            else {
                //...el token es correcto...
                //...se procede con el controlador...
                userModifyProfileController.manager(req, res);
            }
        });
    } 
    catch (error) {
        //...we send the answer to the client...
        res.json(JSON.stringify({code: 'USER0121'}));

        //...we log the error...
        let objParameterError = {
            errorCode: 'USER0121',
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
});



//....we export the "router"...
module.exports = router;