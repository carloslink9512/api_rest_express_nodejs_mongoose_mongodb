'use strict';

const manager = async (data) => {

    try {
        //...we import the data access file...
        const database = require('../data_access/data/error_collection');

        //...we create the data object...
        let objData = {
            errorCode: data.errorCode,
            ipCode: data.ipCode,
            date: data.date,
            redForAdmin: data.readForAdmin,
            enabled: data.enabled
        };

        //...we call the function...
        await database.insertError(objData);

        return;
    } 
    catch (error) {
        return;
    }
}

//...we export the controller...
module.exports = {
    manager
}