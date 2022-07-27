'use strict';

//...we import the error controller...
const errorController = require('../../error.module/controller/error_controller');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');

//...controller...
const manager = async (req, res) => {

    //...we create the data object...
    let objParamater = {
        emailParam: req.body.email.trim()
    };

    const resultUser = await searchUser(objParamater);

    if (resultUser.code === 'ok'){

        //..........................................

        let objResponse = {
            name: resultUser.name.trim(),
            lastname: resultUser.lastname.trim()
        };
        res.json(JSON.stringify({code: 'USER0109', data: objResponse}));
    }
    else {
        res.json(JSON.stringify({code: resultUser.code}));

        if (resultUser.code !== 'USER0105' && resultUser.code !== 'USER0107' && resultUser.code !== 'USER0108'){
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
}

//...auxiliary functions...
const searchUser = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_collection');

        //...we call the function...
        const result = await database.searchEmail(objParameter.emailParam);

        //...we analize the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0105'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.email === objParameter.emailParam && result.enabled === false):
                return {code: 'USER0107'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === false):
                return {code: 'USER0108'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === true):
                return {code: 'ok', id: result._id.toString(), name: result.name, lastname: result.lastname};

            default:
                return {code: 'USER0106'};
        }
    } 
    catch (error) {
        return {code: 'USER0104'};
    }
}

//...we export the controller...
module.exports = {
    manager
}