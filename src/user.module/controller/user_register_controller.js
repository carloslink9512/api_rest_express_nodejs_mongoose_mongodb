'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = require('../other/token/jwt');

//...we import the error controller...
const errorController = require('../../error.module/controller/error_controller');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');
const controlCode = require('../other/control_code/user_control_code_generator');

//...controller...
const manager = async (req, res) => {

    //...we create the data object...
    let objParameter = {
        nameParam: req.body.name.trim(),
        lastnameParam: req.body.lastname.trim(),
        emailParam: req.body.email.trim(),
        passParam: req.body.pass.trim(),
        acceptParam: req.body.accept,
        languageParam: req.body.language.trim(),
        codeSendParam: controlCode.codeGenerator(),
        codeReceivedParam: 'nodata',
        emailConfirmParam: false,
        newsletterParam: req.body.newsletter,
        adminParam: 0,
        enabledParam: true
    };

    let objParameterOperation = {
        idUserParam: '',
        conceptCodeParam: 'U1',
        dateParam: Date.now(),
        ipCodeParam: ip.IpCapture(req)
    };

    //.........................................
    //...consultamos si el usuario ya existe...

    const resultExists = await searchUser(objParameter);

    if (resultExists.code === 'ok'){

        //...the user's email is not registered...
        //...we continue with the registration...
        const resultInsert = await insertUser(objParameter);

        if (resultInsert.code === 'ok'){

            objParameterOperation.idUserParam = resultInsert.id;

            //......................................................................
            //...we continue with the registration in the collection of operation...
            const resultOperation = await insertOperation(objParameterOperation);

            if (resultOperation.code === 'ok'){

                res.json(JSON.stringify({code: 'USER0019'}));

                //...we send the email to the user...
                const resultEmail = await sendUserEmail(objParameter);

                if (resultEmail.code !== 'USER0028'){
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
                //...we inform the client of the negative result of the query...
                res.json(JSON.stringify({code: resultOperation.code}));

                //...we log the error...
                let objParameterError = {
                    errorCode: resultOperation.code,
                    ipCode: ip.IpCapture(req),
                    date: Date.now(),
                    readForAdmin: false,
                    enabled: true
                }

                errorController.manager(objParameterError);

                //...we start the deletion of the document inserted in the collection "register_collection"...
                //...this is because the insert in the collection failed "operations"...
                const resultDelete = await deleteUser(objParameterOperation);

                if (resultDelete.code !== 'ok'){
                    //...we log the error...
                    let objParameterError = {
                        errorCode: resultDelete.code,
                        ipCode: ip.IpCapture(req),
                        date: Date.now(),
                        readForAdmin: false,
                        enabled: true
                    }

                    errorController.manager(objParameterError);
                }
            }
        }
        else {
            //...we inform the client of the negative result of the query...
            res.json(JSON.stringify({code: resultInsert.code}));

            //...we log the error...
            let objParameterError = {
                errorCode: resultInsert.code,
                ipCode: ip.IpCapture(req),
                date: Date.now(),
                readForAdmin: false,
                enabled: true
            }

            errorController.manager(objParameterError);
        }
    }
    else if (resultExists.code === 'USER0005' || resultExists.code === 'USER0006' || resultExists.code === 'USER0007'){
        //...we inform the client of the negative result of the query...
        //...They are not errors, they are warnings...
        res.json(JSON.stringify({code: resultExists.code}));
    }
    else {
        //...we inform the client of the negative result of the query...
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
const sendUserEmail = async (objParameter) => {
    try {
        //...we import the email file...
        const send = require('../other/email/user_register_email');

        //...we call the function...
        const result = await send.sendEmail(objParameter);

        //...we analize the return...
        switch (true) {
            case (result.code === 'USER0026' || result.code === 'USER0027' || result.code === 'USER0028'):
                return result;

            default:
                return {code: 'USER0029'};
        }
    } 
    catch (error) {
        return {code: 'USER0025'};
    }
}

const deleteUser = async (objParameterOperation) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.deleteUser(objParameterOperation.idUserParam);

        //...we analize the return of data access...
        switch (true){
            case (result === null):
                return {code: 'USER0023'};

            case (result.code === 'USER0021' || result.code === 'USER0022'):
                return result;

            case (result._id.toString() === objParameterOperation.idUserParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0024'};
        }
    } 
    catch (error) {
        return {code: 'USER0020'};
    }
}

const insertOperation = async (objParameterOperation) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_operation_collection');

        //...we call the function...
        const result = await database.insertOperation(objParameterOperation);

        //...we call the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0017'};

            case (result.code === 'USER0015' || result.code === 'USER0016'):
                return result;

            case (result.id_user === objParameterOperation.idUserParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0018'};
        }
    } 
    catch (error) {
        return {code: 'USER0014'};
    }
}

const insertUser = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.insertUser(objParameter);

        //...we analyze the return of data access...
        switch (true){
            case (result === null):
                return {code: 'USER0012'};

            case (result.code === 'USER0010' || result.code === 'USER0011'):
                return result;

            case (result.email === objParameter.emailParam):
                return {code: 'ok', codeSend: objParameter.codeSendParam, id: result._id.toString()};

            default:
                return {code: 'USER0013'};
        }
    } 
    catch (error) {
        return {code: 'USER0009'};
    }
}

const searchUser = async (objParameter) => {
    try{
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.searchEmail(objParameter.emailParam);

        //...we analize the return of data access...
        switch (true) {
            //...email no registered...
            case (result === null):
                return {code: 'ok'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.enabled === false):
                return {code: 'USER0005'};

            case (result.enabled === true && result.email_confirm === false):
                return {code: 'USER0006'};

            case (result.enabled === true && result.email_confirm === true):
                return {code: 'USER0007'};

            default:
                return {code: 'USER0008'};
        }
    }
    catch (error){
        return {code: 'USER0002'};
    }
}

//...we export the controller...
module.exports = {
    manager
}