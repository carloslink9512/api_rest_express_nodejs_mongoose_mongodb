'use strict';

//...function to insert document...
const insertContactCommentary = async (data) => {
    try {
        //...we import the connection file...
        require('../connection/string_connections');

        //...we import the data model...
        const ContactCommentaryModel = require('../model/contact_commentary_model');

        try {
            const contactCommentaryModel = new ContactCommentaryModel({
                id_contact: data.idContact,
                concept_code: data.conceptCode,
                commentary: data.commentary,
                ip_code: data.ipCode,
                date: data.date
            });

            //...we insert the document...
            const result = await contactCommentaryModel.save()
                .catch(err => err);

            return result;
        }
        catch (error) {
            return {code: 'CONT0009'};
        }
    }
    catch (error) {
        return {code: 'CONT0008'};
    }
}

//...we export the function...
module.exports = {
    insertContactCommentary
}