'use strict';

//...we import the libraries...
const mongoose = require('mongoose');

//...we create the schema...
const contactSchema = new mongoose.Schema({
    name: {type: String, default: 'nodata'},
    lastname: {type: String, default: 'nodata'},
    email: {type: String, default: 'nodata'},
    phone: {type: String, default: 'nodata'},
    accept: {type: Boolean, default: false},
    important: {type: Boolean, default: false},
    registered_user: {type: Boolean, default: false},
    read_for_admin: {type: Boolean, default: false},
    reply: {type: Boolean, default: true},
    language: {type: String, default: 'en'},
    enabled: {type: Boolean, default: false}
}, {collection: 'contact_collection'});

//...we create the model...
const ContactModel = mongoose.model('ContactModel', contactSchema);

//...we export the model...
module.exports = ContactModel;