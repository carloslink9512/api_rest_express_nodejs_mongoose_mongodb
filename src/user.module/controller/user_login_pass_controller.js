'use strict'

const jwt = require('jsonwebtoken');
const jwtSecret = require('../other/token/jwt');

//...we import the error controller...
const errorController = require('../../error.module/controller/error_controller');

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');
const { decryptor } = require('../other/crypto/decryptor');

//...controller...
const manager = async (req, res) => {

    //...we create the data object...
    let objParameter = {
        emailParam: req.body.email.trim(),
        encryptedPassParam: req.body.encryptedPass.trim()
    };

    let objParameterOperation = {
        idUserParam: '',
        conceptCodeParam: 'U4',
        dateParam: Date.now(),
        ipCodeParam: ip.IpCapture(req)
    };

    //...............................
    const resultUser = await searchUser(objParameter);

    if (resultUser.code === 'ok'){

        if (decryptor(objParameter.encryptedPassParam) === decryptor(resultUser.encryptedPass)){

            //...............................
            //...we create the json web token object...(asincrono)
            const token = jwt.sign(
                {id: resultUser.id},
                jwtSecret.secret,
                {expiresIn: '24h'}
            );

            //...we create the response object...
            let objResponse = {
                id: resultUser.id,
                /* name: resultUser.name, */
                /* lastname: resultUser.lastname, */
                newsletter: resultUser.newsletter,
                admin: resultUser.admin
            };

            //...we send the client the object and the token...
            res.json(JSON.stringify({
                code: 'USER0120',
                auth: true,
                token: token,
                data: objResponse
            }));

            //...............................
            //...we register the login...
            objParameterOperation.idUserParam = resultUser.id;

            const resultUserLogin = await registerLogin(objParameterOperation);

            if (resultUserLogin.code !== 'ok'){
                //...we log the error...
                let objParameterError = {
                    errorCode: resultUserLogin.code,
                    ipCode: ip.IpCapture(req),
                    date: Date.now(),
                    readForAdmin: false,
                    enabled: true
                };

                errorController.manager(objParameterError);
            }
        }
        else {
            res.json(JSON.stringify({code: 'USER0116'}));
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
const registerLogin = async (objParameterOperation) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/user_operation_collection');

        //...we call the function...
        const result = await database.insertOperation(objParameterOperation);

        //...we analyze the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'USER0118'};

            case (result.code === 'USER0015' || result.code === 'USER0016'):
                return result;

            case (result.id_user === objParameterOperation.idUserParam):
                return {code: 'ok'};

            default:
                return {code: 'USER0119'};
        }
    } 
    catch (error) {
        return {code: 'USER0117'}    
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
                //...the user is not registered...
                return {code: 'USER0114'};

            case (result.code === 'USER0003' || result.code === 'USER0004'):
                return result;

            case (result.email === objParameter.emailParam && result.enabled === false):
                return {code: 'USER0112'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === false):
                return {code: 'USER0113'};

            case (result.email === objParameter.emailParam && result.enabled === true && result.email_confirm === true):
                return {
                    code: 'ok',
                    id: result._id.toString(),
                    encryptedPass: result.pass,
                    /* name: result.name, */
                    /* lastname: result.lastname, */
                    newsletter: result.newsletter,
                    admin: result.admin
                };

            default:
                return {code: 'USER0115'};
        }
    } 
    catch (error) {
        return {code: 'USER0111'};
    }
}

//...we export the controller...
module.exports = {
    manager
}