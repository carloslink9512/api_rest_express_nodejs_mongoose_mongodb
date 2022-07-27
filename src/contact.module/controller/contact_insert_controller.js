'use strict';

//...we import the functions...
const ip = require('../../other.module/ip/ip_capture');

//...we import the controllers...
const errorController = require('../../error.module/controller/error_controller');

//...controller...
const manager = async (req, res) => {

    //...we create the data object...
    let objParameter = {
        name: req.body.name.trim(),
        lastname: req.body.lastname.trim(),
        email: req.body.email.trim(),
        phone: req.body.phone.trim(),
        accept: req.body.accept,
        important: false,
        registeredUser: false,
        readForAdmin: false,
        reply: true,
        language: req.body.language.trim(),
        enabled: true
    };

    let objParameterCommentary = {
        idContact: '',
        conceptCode: 'C1', // c1: insert
        commentary: req.body.commentary.trim(),
        ipCode: ip.IpCapture(req),
        date: Date.now()
    };

    //.....................................
    //...insert contact...

    const resultContact = await insertContact(objParameter);

    if (resultContact.code === 'ok'){

        //...insert commentary...
        objParameterCommentary.idContact = resultContact.id;

        const resultContactCommentary = await insertContactCommentary(objParameterCommentary);

        if (resultContactCommentary.code === 'ok'){

            //...we inform the client about the positive result...
            res.json(JSON.stringify({code: 'CONT0017'}));

            //............................................................
            //...we send the emails to the administrator and the client...

            const resultAllEmail = await Promise.all([sendClientEmail(objParameter, objParameterCommentary), sendAdminEmail(objParameter, objParameterCommentary)]);

            if (resultAllEmail[0].code !== 'CONT0021'){
                //...we log the error...
                let objParameterError = {
                    errorCode: resultAllEmail[0].code,
                    ipCode: ip.IpCapture(req),
                    date: Date.now(),
                    readForAdmin: false,
                    enabled: true
                }
                errorController.manager(objParameterError);
            }

            if (resultAllEmail[1].code !== 'CONT0026'){
                //...we log the error...
                let objParameterError = {
                    errorCode: resultAllEmail[1].code,
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
            res.json(JSON.stringify({code: resultContactCommentary.code}));

            //...we log the error...
            let objParameterError = {
                errorCode: resultContactCommentary.code,
                ipCode: ip.IpCapture(req),
                date: Date.now(),
                readForAdmin: false,
                enabled: true
            };

            errorController.manager(objParameterError);

            //...necesitamos revertir el insert del contacto, de la función inicial...
            //...no enviamos devoluciones al cliente...
            //...en caso de error solo registramos el mismo...
            //...estamos dando una especie de integridad referencial...

            const resultDeleteContact = await deleteContact(objParameterCommentary.idContact);

            if (resultDeleteContact.code !== 'ok'){
                let objParameterError = {
                    errorCode: resultDeleteContact.code,
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
        res.json(JSON.stringify({code: resultContact.code}));

        //...we log the error...
        let objParameterError = {
            errorCode: resultContact.code,
            ipCode: ip.IpCapture(req),
            date: Date.now(),
            readForAdmin: false,
            enabled: true
        };

        errorController.manager(objParameterError);
    }
}

//...auxiliary functions...

const deleteContact = async (idContact) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/contact_collection');

        //...we call the function...
        const result = await database.deleteContact(idContact);

        //...we analize the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'CONT0015'};

            case (result.code === 'CONT0013' || result.code === 'CONT0014'):
                return result;

            case (result._id.toString() === idContact):
                return {code: 'ok'};

            default:
                return {code: 'CONT0016'};
        }
    } 
    catch (error) {
        return {code: 'CONT0012'};
    }
}

const sendAdminEmail = async (objParameter, objParameterCommentary) => {
    try {
        //...we import the email file...
        const send = require('../other/email/contact_admin_email');

        //...we execute the sending of the email...
        const result = await send.sendEmail(objParameter, objParameterCommentary);

        //...we analize the return of data access....
        switch (true) {
            case (result.code === 'CONT0024' || result.code === 'CONT0025' || result.code === 'CONT0026'):
                return result;

            default:
                return {code: 'CONT0027'};
        }
    }
    catch (error) {
        return {code: 'CONT0023'};
    }
}

const sendClientEmail = async (objParameter, objParameterCommentary) => {
    try {
        //...we import the email file...
        const send = require('../other/email/contact_client_email');

        //...we execute the sending of the email...
        const result = await send.sendEmail(objParameter, objParameterCommentary);

        //...we analize the return of data access....
        switch (true) {
            case (result.code === 'CONT0019' || result.code === 'CONT0020' || result.code === 'CONT0021'):
                return result;

            default:
                return {code: 'CONT0022'};
        }
    } 
    catch (error) {
        return {code: 'CONT0018'};
    }
}

const insertContactCommentary = async (objParameterCommentary) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/contact_commentary_collection');

        //...we call the function...
        const result = await database.insertContactCommentary(objParameterCommentary);

        //...we analize the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'CONT0010'};

            case (result.code === 'CONT0008' || result.code === 'CONT0009'):
                return result;

            case (result.id_contact === objParameterCommentary.idContact):
                return {code: 'ok'};

            default:
                return {code: 'CONT0011'};
        }
    } 
    catch (error) {
        return {code: 'CONT0007'};
    }
}

const insertContact = async (objParameter) => {
    try {
        //...we import the data access file...
        const database = require('../data_access/data/contact_collection');

        //...we call the function to insert documents...
        const result = await database.insertContact(objParameter);

        //...we analize the return of data access...
        switch (true) {
            case (result === null):
                return {code: 'CONT0005'};

            case (result.code === 'CONT0003' || result.code === 'CONT0004'):
                return result;

            case (result.email === objParameter.email):
                return {code: 'ok', id: result._id.toString()};

            default:
                return {code: 'CONT0006'};
        }
    }
    catch (error) {
        return {code: 'CONT0002'};
    }
}

//...we export the controller...
module.exports = {
    manager
}