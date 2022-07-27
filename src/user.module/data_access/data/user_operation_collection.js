'use strict';

//...
const insertOperation = async (data) => {
    try {
        //...
        require('../connection/string_connection');

        //...
        const UserOperationModel = require('../model/user_operation_model');

        try {
            const userOperationModel = new UserOperationModel({
                id_user: data.idUserParam,
                concept_code: data.conceptCodeParam,
                date: data.dateParam,
                ip_code: data.ipCodeParam
            });

            //...save...
            const result = await userOperationModel.save()
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'USER0016'};
        }
    } 
    catch (error) {
        return {code: 'USER0015'};
    }
}

//..we export the functions...
module.exports = {
    insertOperation
}