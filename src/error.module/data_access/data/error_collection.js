'use strict';

//...
const insertError = async (data) => {
    try {
        //...we import the connection file...
        require('../connection/string_connection');

        //...we import the data model file...
        const ErrorModel = require('../model/error_model');

        try {
            const errorModel = new ErrorModel({
                error_code: data.errorCode,
                ip_code: data.ipCode,
                date: data.date,
                read_for_admin: data.readForAdmin,
                enabled: data.enabled
            });

            //...we insert the document...
            await errorModel.save()
                .catch(err => err);

            return;
        }
        catch (error) {
            return;
        }
    }
    catch (error) {
        return;
    }

}

//...we export the functions...
module.exports = {
    insertError
}