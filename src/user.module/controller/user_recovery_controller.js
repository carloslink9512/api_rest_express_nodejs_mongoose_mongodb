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
        acceptParam: req.body.accept,
        languageParam: req.body.language.trim(),
        adminParam: 0
    };

    //...........................................
    const resultUser = await searchUser(objParameter);

    if (resultUser.code === 'ok'){

        //............................................
        const resultEmail = await sendRecoveryEmail(objParameter.emailParam, resultUser.codeSend, resultUser.name, resultUser.lastname, objParameter.languageParam);

        //...we inform the client about the negativw result...
        res.json(JSON.stringify({code: resultEmail.code, name: resultUser.name}));

        if (resultEmail.code !== 'USER0075'){

            //...we log the error...
            let objParameterError = {
                errorCode: resultEmail.code,
                ipCode: ip.IpCapture(req),
                date: Date.now(),
                readForAdmin: false,
                enabled: true
            }

            errorController.manager(objParameterError);
        }
    }
    else {
        //...we inform the client about the negativw result...
        res.json(JSON.stringify({code: resultUser.code}));

        if (resultUser.code !== 'USER0067' && resultUser.code !== 'USER0069' && resultUser.code !== 'USER0070'){
            //...we log the error...
            let objParameterError = {
                errorCode: resultUser.code,
                ipCode: ip.IpCapture(req),
                date: Date.now(),
                readForAdmin: false,
                enabled: true
            }

            errorController.manager(objParameterError);
        }
    }
}

//...auxiliary functions...
const sendRecoveryEmail = async (userEmail, codeSend, userName, userLastname, language) => {
    try {
        const send = require('../other/email/user_recovery_email');

        //...we create the data object...
        let objData = {
            name: userName,
            lastname: userLastname,
            email: userEmail,
            codeSend: codeSend,
            language: language
        };

        //...we call the function...
        const result = await send.sendEmail(objData);

        //...we analyze the return of email file...
        switch (true) {
            case (result.code === 'USER0073' || result.code === 'USER0074' || result.code === 'USER0075'):
                return result;

            default:
                return {code: 'USER0076'};
        }
    } 
    catch (error) {
        return {code: 'USER0072'};
    }
}


const searchUser = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.searchEmail(objParameter.emailParam);

        //...we analyze the return of data access...
        switch (true) {
            case (result === null):
                //...email no registered...
                return {code: 'USER0067'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.email === objParameter.emailParam && result.enabled === false):
                return {code: 'USER0069'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === false):
                return {code: 'USER0070'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === true):
                return {code: 'ok', name: result.name, lastname: result.lastname, codeSend: result.code_send};

            default:
                return {code: 'USER0068'};
        }
    } 
    catch (error) {
        return {code: 'USER0066'};
    }
}

//...we export the controller...
module.exports = {
    manager
}