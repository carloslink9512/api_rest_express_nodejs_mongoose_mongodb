'use strict';

//...we import the libraries...
const mongoose = require('mongoose');

//...we create the schema...
const errorSchema = new mongoose.Schema({
    error_code: {type: String, default: 'nodata'},
    ip_code: {type: String, default: 'nodata'},
    date: {type: Date, default: Date.now()},
    read_for_admin: {type: Boolean, default: false},
    enabled: {type: Boolean, default: true}
}, {collection: 'error_collection'});

//...we create the model...
const ErrorModel = mongoose.model('ErrorModel', errorSchema);

//...we export the model...
module.exports = ErrorModel;