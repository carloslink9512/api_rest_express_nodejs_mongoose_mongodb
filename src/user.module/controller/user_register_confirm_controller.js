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
        codeReceivedParam: req.body.controlCode.trim(),
        emailConfirmParam: req.body.accept,
        languageParam: req.body.language.trim()
    };

    let objParameterOperation = {
        idUserParam: '',
        conceptCodeParam: 'U2',
        dateParam: Date.now(),
        ipCodeParam: ip.IpCapture(req)
    };

    //..........................................
    //...we comfirm the existence of the user...
    const resultExists = await searchUser(objParameter);

    if (resultExists.code === 'ok'){
        
        //...we check if the verification code is equal to the registered code...
        if (resultExists.codeSend === objParameter.codeReceivedParam){

            //...update the user document...
            const resultUpdate = await updateUser(objParameter);

            if (resultUpdate.code === 'ok'){

                //..................................
                //...we insert the document in the operations collection...
                objParameterOperation.idUserParam = resultExists.id;

                const resultOperationInsert = await insertOperationUser(objParameterOperation);

                if (resultOperationInsert.code === 'ok'){

                    //...the operations collections has received the new document...
                    res.json(JSON.stringify({code: 'USER0048'}));

                    //.................................................................
                    //...we send the email to the user confirming their registration...
                    const resultEmail = await sendConfirmEmail(resultExists.name, objParameter.emailParam, objParameter.languageParam);

                    if (resultEmail.code !== 'USER0052'){
                        //...the email was not sent...
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
                    //...we inform the client about the negative result...
                    res.json(JSON.stringify({code: resultOperationInsert.code}));

                    //...we log the error...
                    let objParameterError = {
                        errorCode: resultOperationInsert.code,
                        ipCode: ip.IpCapture(req),
                        date: Date.now(),
                        readForAdmin: false,
                        enabled: true
                    }

                    errorController.manager(objParameterError);

                    //...the document for the collection of operations has failed...
                    //...it is necessary to bo back the operation on the first collection...
                    const resultUpdateUserReturn = await updateUserReturn(objParameter);

                    if (resultUpdateUserReturn.code !== 'ok'){
                        //...we log the error...
                        let objParameterError = {
                            errorCode: resultUpdateUserReturn.code,
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
                //...we inform the client about the negative result...
                res.json(JSON.stringify({code: resultUpdate.code}));

                //...we log the error...
                let objParameterError = {
                    errorCode: resultUpdate.code,
                    ipCode: ip.IpCapture(req),
                    date: Date.now(),
                    readForAdmin: false,
                    enabled: true
                }

                errorController.manager(objParameterError);
            }
        }
        else {
            res.json(JSON.stringify({code: 'USER0036'}));
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

//...auxiliary function...
const sendConfirmEmail = async (userName, userEmail, language) => {
    try {
        //...we import the email file...
        const send = require('../other/email/user_register_confirm_email');

        //...we create the object...
        const objData = {
            name: userName,
            email: userEmail,
            language: language
        };

        //...we call the function...
        const result = await send.sendEmail(objData);

        //...we analyze the return of email file...
        switch (true) {
            case (result.code === 'USER0050' || result.code === 'USER0051' || result.code === 'USER0052'):
                return result;

            default:
                return {code: 'USER0053'};
        }
    } 
    catch (error) {
        return {code: 'USER0049'};
    }
}

const updateUserReturn = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we create the data object...
        let objData = {
            emailParam: objParameter.emailParam,
            emailConfirmParam: false,
            codeReceivedParam: 'nodata'
        };

        //...we call the function...
        const result = await database.updateUser(objData);

        //...we analyze the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0046'};

            case (result.code === 'USER0038' || result.code === 'USER0039'):
                return result;

            case (result.email === objParameter.emailParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0047'};
        }
    } 
    catch (error) {
        return {code: 'USER0045'};
    }
}

const insertOperationUser = async (objParameterOperation) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_operation_collection');

        //...we call the function...
        const result = await database.insertOperation(objParameterOperation);

        //...we analize the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0043'};

            case (result.code === 'USER0015' || result.code === 'USER0016'):
                return result;

            case (result.id_user === objParameterOperation.idUserParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0044'};
        }
    } 
    catch (error) {
        return {code: 'USER0042'};
    }
}

const updateUser = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.updateUser(objParameter);

        //...we analize the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0040'};

            case (result.code === 'USER0038' || result.code === 'USER0039'):
                return result;

            case (result.email === objParameter.emailParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0041'};
        }
    } 
    catch (error) {
        return {code: 'USER0037'};
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
                return {code: 'USER0032'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.email === objParameter.emailParam && result.enabled === false):
                return {code: 'USER0034'};

            case (result.email === objParameter.emailParam && result.email_confirm === true && result.enabled === true):
                return {code: 'USER0035'};

            case (result.email === objParameter.emailParam && result.email_confirm === false && result.enabled === true):
                return {code: 'ok', codeSend: result.code_send, name: result.name, id: result._id.toString()};

            default:
                return {code: 'USER0033'};
        }
    } 
    catch (error) {
        return {code: 'USER0031'};
    }
}

//...we export the controller...
module.exports = {
    manager
}