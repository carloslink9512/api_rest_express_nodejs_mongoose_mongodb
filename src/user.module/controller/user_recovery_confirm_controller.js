'use strict';

//...we import the error controller...
const errorController = require('../../error.module/controller/error_controller');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');

//...controller...
const manager = async (req, res) => {

    //...we create the data object...
    let objParameter = {
        emailParam: req.body.email.trim(),
        controlCodeParam: req.body.controlCode.trim(),
        accepParam: req.body.accept,
        languageParam: req.body.language.trim()
    };

    //...we look for the user by email...
    const resultUser = await searchUser(objParameter);

    if (resultUser.code === 'ok'){
        
        //............................................
        //...we control the equility of verification codes...
        if (resultUser.codeSend === objParameter.controlCodeParam){
            
            //...we notify the user that the code was accepted and can continue...
            res.json(JSON.stringify({code: 'USER0083'}));
        }
        else {
            //...verification code does not match...
            res.json(JSON.stringify({code: 'USER0082'}));
        }
    }
    else {
        //...we inform the client about the negative result...
        res.json(JSON.stringify({code: resultUser.code}));

        //...we log the error...
        let objParameterError = {
            errorCode: resultUser.code,
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
}

//...auxiliary functions...
const searchUser = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.searchEmail(objParameter.emailParam);

        //...we analyze the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0079'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.email === objParameter.emailParam && result.enabled === false):
                return {code: 'USER0081'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === true):
                return {code: 'ok', codeSend: result.code_send};

            default:
                return {code: 'USER0080'};
        }
    } 
    catch (error) {
        return {code: 'USER0078'};
    }
}

//...we export the "manager"...
module.exports = {
    manager
}