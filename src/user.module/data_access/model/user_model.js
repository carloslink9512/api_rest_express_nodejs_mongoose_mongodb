'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, default: 'nodata'},
    lastname: {type: String, default: 'nodata'},
    email: {type: String, default: 'nodata'},
    pass: {type: String, default: 'nodata'},
    accept: {type: Boolean, default: false},
    language: {type: String, default: 'nodata'},
    code_send: {type: String, default: 'nodata'},
    code_received: {type: String, default: 'nodata'},
    email_confirm: {type: Boolean, default: false},
    newsletter: {type: Boolean, default: false},
    admin: {type: Number, default: 0},
    enabled: {type: Boolean, default: false}
}, {collection: 'user_collection'});

const UserModel = new mongoose.model('UserModel', userSchema);

//...we export the model...
module.exports = UserModel;