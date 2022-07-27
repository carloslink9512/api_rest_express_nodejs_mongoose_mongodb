'use strict';

//...function to insert document...
const insertContact = async (data) => {
    try {
        //...we import the connection file...
        require('../connection/string_connections');   

        //...we import the data model file...
        const ContactModel = require('../model/contact_model');

        try {
            const contactModel = new ContactModel({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                accept: data.accept,
                important: data.important,
                registered_user: data.registeredUser,
                read_for_admin: data.readForAdmin,
                reply: data.reply,
                language: data.language,
                enabled: data.enabled
            });

            //...we insert the document...
            const result = await contactModel.save()
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'CONT0004'};
        }
    }
    catch (error) {
        return {code: 'CONT0003'};
    }
}


const deleteContact = async (data) => {
    try {
        //...we import the connection file...
        require('../connection/string_connections');

        //...we import the data model file...
        const ContactModel = require('../model/contact_model');

        try {
            const query = {
                _id: data
            }
            const result = await ContactModel.findByIdAndDelete(query)
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'CONT0014'};
        }
    } 
    catch (error) {
        return {code: 'CONT0013'};
    }
}

//...we export the functions...
module.exports = {
    insertContact,
    deleteContact
}