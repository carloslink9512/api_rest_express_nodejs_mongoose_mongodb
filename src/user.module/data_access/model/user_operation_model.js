'use strict';

const mongoose = require('mongoose');

const userOperationSchema = new mongoose.Schema({
    id_user: {type: String, default: 'nodata'},
    concept_code: {type: String, default: 'nodata'},
    date: {type: Date, default: Date.now()},
    ip_code: {type: String, default: 'nodata'}
    
}, {collection: 'user_operation_collection'});

const UserOperationModel = new mongoose.model('UserOperationModel', userOperationSchema);

//...we export the model...
module.exports = UserOperationModel;