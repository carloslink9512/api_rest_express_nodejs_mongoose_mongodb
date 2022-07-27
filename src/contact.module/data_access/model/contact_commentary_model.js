'use strict';

//...we import the libraries...
const mongoose = require('mongoose');

//...we create the schema...
const contactCommentarySchema = new mongoose.Schema({
    id_contact: {type: String, default: 'nodata'},
    concept_code: {type: String, default: 'nodata'},
    commentary: {type: String, default: 'nodata'},
    ip_code: {type: String, default: 'nodata'},
    date: {type: Date, default: Date.now()} 
}, {collection: 'contact_commentary_collection'});

//...we create the model...
const ContactCommentaryModel = mongoose.model('ContactCommentaryModel', contactCommentarySchema);

//...we export the model...
module.exports = ContactCommentaryModel;