'use strict';

//...we import the error controller...
const errorController = require('../../error.module/controller/error_controller');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');

//...controller...
const manager = async (req, res) => {

    //...we create the object...
    let objParameter = {
        nameParam: req.body.userName.trim(),
        lastnameParam: req.body.userLastname.trim(),
        idUserParam: req.body.userId.trim(),
        newsletterParam: req.body.userNewsletter
    };

    let objParameterOperation = {
        idUserParam: req.body.userId.trim(),
        conceptCodeParam: 'U7',
        dateParam: Date.now(),
        ipCodeParam: ip.IpCapture(req)
    };

    //...we look for the user by the id...
    const resultUser = await searchUserId(objParameter);

    if (resultUser.code === 'ok'){

        //.......................................
        //...we change the name and lastname...
        const resultUpdate = await updateUserProfile(objParameter);

        if (resultUpdate.code === 'ok'){
            res.json(JSON.stringify({code: 'USER0135'}));

            //......................................
            //...we continue with the registration in the operations table...
            const resultOperation = await insertOperation(objParameterOperation);

            if (resultOperation.code !== 'ok'){
                //...this operation sends no response to the client...
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
    else if (resultUser.code === 'USER0129'){
        //...we inform the client about the navigate result...
        res.json(JSON.stringify({code: resultUser.code}));
    }
    else {
        //...we inform the client about the navigate result...
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
const insertOperation = async (objParameterOperation) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_operation_collection');

        //...we call the function...
        const result = await database.insertOperation(objParameterOperation);

        //...we analyze the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0137'};

            case (result.code === 'USER0015' || result.code === 'USER0016'):
                return result;

            case (result.id_user === objParameterOperation.idUserParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0138'};
        }
    }
    catch (error) {
        return {code: 'USER0136'};
    }
}

const updateUserProfile = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.updateUserProfile(objParameter);

        //...we analyze the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0133'};

            case (result.code === 'USER0131' || result.code === 'USER0132'):
                return result;

            case (result._id.toString() === objParameter.idUserParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0134'};
        }
    }
    catch (error) {
        return {code: 'USER0130'};
    }
}

const searchUserId = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.searchId(objParameter.idUserParam);

        //...we analyze the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0127'};

            case (result.code === 'USER0125' || result.code === 'USER0126'):
                return result;

            case (result._id.toString() === objParameter.idUserParam && result.enabled === false):
                return {code: 'USER0129'};

            case (result._id.toString() === objParameter.idUserParam && result.enabled === true && result.email_confirm === true):
                return {code: 'ok'};

            default:
                return {code: 'USER0128'};
        }
    } 
    catch (error) {
        return {code: 'USER0124'};
    }
}

//...we export the controller...
module.exports = {
    manager
}