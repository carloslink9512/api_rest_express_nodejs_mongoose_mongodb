'use strict';

//...we import the error controller...
const errorController = require('../../error.module/controller/error_controller');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');

//...controller...
const manager = async (req, res) => {

    //...we create the object...
    let objParameter = {
        emailParam: req.body.email.trim(),
        passParam: req.body.pass.trim(),
        acceptParam: req.body.accept,
        languageParam: req.body.language.trim()
    };

    let objParameterOperation = {
        idUserParam: '',
        conceptCodeParam: 'U3', //código para el cambio de contraseña....
        dateParam: Date.now(),
        ipCodeParam: ip.IpCapture(req)
    };

    //...we log for the user by email...
    const resultUser = await searchUser(objParameter);

    if (resultUser.code === 'ok'){

        //................................................
        //...we change the password for the new one...
        //...we update the user document...
        const resultUpdate = await updateUserPass(objParameter);

        if (resultUpdate.code === 'ok'){

            //...we send the notice to the user...
            res.json(JSON.stringify({code: 'USER0094', name: resultUser.name}));

            //..................................................
            //...we send the client a warning email...
            const resultEmail = await sendEmail(resultUser.name, objParameter.emailParam, objParameter.languageParam);

            if (resultEmail.code !== 'USER0098'){
                //...we log the error...
                let objParameterError = {
                    errorCode: resultEmail.code,
                    ipCode: ip.IpCapture(req),
                    date: Date.now(),
                    readForAdmin: false,
                    enabled: true
                };

                errorController.manager(objParameterError);
            }

            //.......................................
            //...registramos la operación...
            objParameterOperation.idUserParam = resultUser.id;

            const resultOperation = await inserOperation(objParameterOperation);

            if (resultOperation.code !== 'ok'){
                //...we log the error...
                let objParameterError = {
                    errorCode: resultOperation.code,
                    ipCode: ip.IpCapture(req),
                    date: Date.now(),
                    readForAdmin: false,
                    enabled: true
                };

                errorController.manager(objParameterError);
            }
        }
        else {
            //...we inform the client about the negative result...
            res.json(JSON.stringify({code: resultUpdate.code}));

            //...we log the error...
            let objParameterError = {
                errorCode: resultUpdate.code,
                ipCode: ip.IpCapture(req),
                date: Date.now(),
                readForAdmin: false,
                enabled: true
            };

            errorController.manager(objParameterError);
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
const inserOperation = async (objParameterOperation) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_operation_collection');

        //...we call the function...
        const result = await database.insertOperation(objParameterOperation);

        //...we analyze the return of data access...
        switch (true){
            case (result === null):
                return {code: 'USER0101'};

            case (result.code === 'USER0015' || result.code === 'USER0016'):
                return result;

            default:
                return {code: 'USER0102'};
        }
    } 
    catch (error) {
        return {code: 'USER0100'};
    }
}

const sendEmail = async (userName, userEmail, userLanguage) => {
    try {
        //...we import the email file...
        const send = require('../other/email/user_recovery_change_email');

        //...we create the data object...
        let objData = {
            name: userName,
            email: userEmail,
            language: userLanguage
        };

        //...we call the function...
        const result = await send.sendEmail(objData);

        switch (true) {
            case (result.code === 'USER0096' || result.code === 'USER0097' || result.code === 'USER0098'):
                return result;

            default:
                return {code: 'USER0099'};
        }
    } 
    catch (error) {
        return {code: 'USER0095'};
    }
}

const updateUserPass = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.updateUserPass(objParameter);

        //...we analyze the data access file...
        switch (true) {
            case (result === null):
                return {code: 'USER0092'};

            case (result.code === 'USER0090' || result.code === 'USER0091'):
                return result;

            case (result.email === objParameter.emailParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0093'};
        }
    } 
    catch (error) {
        return {code: 'USER0089'};
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
                return {code: 'USER0086'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.email === objParameter.emailParam && result.enabled === false):
                return {code: 'USER0088'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === true):
                return {code: 'ok', name: result.name, id: result._id.toString()};

            default:
                return {code: 'USER0087'};
        }
    } 
    catch (error) {
        return {code: 'USER0085'};
    }
}

//...we export the controller...
module.exports = {
    manager
}