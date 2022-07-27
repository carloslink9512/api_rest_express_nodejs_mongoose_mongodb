'use strict';

//...function to check a user's email...
const searchEmail = async (data) => {
    try {
        //...we import the string connection file...
        require('../connection/string_connection');

        //...we import the data model...
        const UserModel = require('../model/user_model');

        try {
            const query = {
                email: data
            };
            const result = await UserModel.findOne(query)
                .lean()
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'USER0004'};
        }
    } 
    catch (error) {
        return {code: 'USER0003'};
    }
}

//...
const insertUser = async (data) => {
    try {
        //...we import the string connection file...
        require('../connection/string_connection');

        //...we import the data model...
        const UserModel = require('../model/user_model');

        try {
            const userModel = new UserModel({
                name: data.nameParam,
                lastname: data.lastnameParam,
                email: data.emailParam,
                pass: data.passParam,
                accept: data.acceptParam,
                language: data.languageParam,
                code_send: data.codeSendParam,
                code_received: data.codeReceivedParam,
                email_confirm: data.emailConfirmParam,
                newsletter: data.newsletterParam,
                admin: data.adminParam,
                enabled: data.enabledParam
            });

            //...save...
            const result = await userModel.save()
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'USER0011'};
        }
    } 
    catch (error) {
        return {code: 'USER0010'};
    }
}

//...delete user function...
const deleteUser = async (data) => {
    try {
        //...we import the string connection file...
        require('../connection/string_connection');

        //...we import the data model...
        const UserModel = require('../model/user_model');

        try {
            const query = {_id: data};
            const result = await UserModel.findByIdAndDelete(query)
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'USER0022'};
        }
    } 
    catch (error) {
        return {code: 'USER0021'};
    }
}

//...update user function...
const updateUser = async (data) => {
    try {
        //...we import the string connection file...
        require('../connection/string_connection');

        //...we import the data model...
        const UserModel = require('../model/user_model');

        try {
            const query = {email: data.emailParam};
            const updateData = {
                email_confirm: data.emailConfirmParam,
                code_received: data.codeReceivedParam
            };
            const result = await UserModel.findOneAndUpdate(query, updateData)
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'USER0039'};
        }
    } catch (error) {
        return {code: 'USER0038'};
    }
}

//...update user pass function...
const updateUserPass = async (data) => {
    try {
        //...we import the string connection file...
        require('../connection/string_connection');

        //...we import the data model...
        const UserModel = require('../model/user_model');

        try {
            const query = {email: data.emailParam};
            const updateData = {
                pass: data.passParam
            };
            const result = await UserModel.findOneAndUpdate(query, updateData)
                .catch(err => err);

            return result;
        } 
        catch (error) {
            return {code: 'USER0091'};
        }
    } 
    catch (error) {
        return {code: 'USER0090'};
    }
}

//...
const searchId = async (data) => {
    try {
        //...we import the string connection file...
        require('../connection/string_connection');

        //...we import the data model...
        const UserModel = require('../model/user_model');

        try {
            const query = {
                '_id': data
            };
            const result = await UserModel.findOne(query)
                .lean()
                .catch(err => err);

            return result;
        }
        catch (error) {
            return {code: 'USER0126'};
        }
    } 
    catch (error) {
        return {code: 'USER0125'};
    }
}

//...
const updateUserProfile = async (data) => {
    try {
        //...we import the string connection file...
        require('../connection/string_connection');

        //...we import the data model...
        const UserModel = require('../model/user_model');

        try {
            const query = {
                '_id': data.idUserParam
            };

            const updateData = {
                name: data.nameParam,
                lastname: data.lastnameParam,
                newsletter: data.newsletterParam,
            };

            const result = await UserModel.findOneAndUpdate(query, updateData)
                .catch(err => err);

            return result;
        }
        catch (error) {
            return {code: 'USER0132'};
        }
    }
    catch (error) {
        return {code: 'USER0131'};
    }
}

//...we export the functions...
module.exports = {
    searchEmail,
    insertUser,
    deleteUser,
    updateUser,
    updateUserPass,
    searchId,
    updateUserProfile
}