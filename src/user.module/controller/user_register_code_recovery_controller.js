'use strict';

//...we import the error controller...
const errorController = require('../../error.module/controller/error_controller');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');

//...controller...
const manager = async (req, res) => {

    //...we create the parameters...
    let objParameter = {
        emailParam: req.body.email.trim(),
        nameParam: '',
        codeSendParam: '',
        languageParam: ''
    };

    //.............................................
    //...we confirm the existence of the user...
    const resultExists = await searchUser(objParameter);

    if (resultExists.code === 'ok'){

        objParameter.nameParam = resultExists.name;
        objParameter.codeSendParam = resultExists.codeSend;
        objParameter.languageParam = resultExists.language;

        //...we resend the verification code...
        const resultResendVerificationCode = await resendVerificationCode(objParameter);

        res.json(JSON.stringify({code: resultResendVerificationCode.code}));

        if (resultResendVerificationCode.code !== 'USER0063'){
             //...we log the error...
             let objParameterError = {
                errorCode: resultResendVerificationCode.code,
                ipCode: ip.IpCapture(req),
                date: Date.now(),
                readForAdmin: false,
                enabled: true
            }

            errorController.manager(objParameterError);
        }
    }
    else {
        //...we informthe user about the negative result of the query...
        res.json(JSON.stringify({code: resultExists.code}));

        //...we log the error...
        let objParameterError = {
            errorCode: resultExists.code,
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        }

        errorController.manager(objParameterError);
    }
}

//...auxiliary functions...

const resendVerificationCode = async (objParameter) => {
    try {
        //...we import the email file...
        const send = require('../other/email/user_resend_verification_code_email');

        //...we call the function...
        const result = await send.sendEmail(objParameter);

        //...we analyze the return...
        switch (true) {
            case (result.code === 'USER0061' || result.code === 'USER0062' || result.code === 'USER0063'):
                return result;

            default:
                return {code: 'USER0064'};
        }
    } 
    catch (error) {
        return {code: 'USER0060'};
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
                return {code: 'USER0058'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.email === objParameter.emailParam && result.enabled === false):
                return {code: 'USER0056'};

            case (result.email === objParameter.emailParam && result.email_confirm === true && result.enabled === true):
                return {code: 'USER0057'};

            case (result.email === objParameter.emailParam && result.email_confirm === false && result.enabled === true):
                return {code: 'ok', codeSend: result.code_send, name: result.name, id: result._id.toString(), language: result.language};
            
            default:
                return {code: 'USER0059'};
        }
    } 
    catch (error) {
        return {code: 'USER0055'};
    }
}

//...we export the controller...
module.exports = {
    manager
}