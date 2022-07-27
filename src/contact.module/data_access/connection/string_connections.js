'use strict';

//...we import the libraries...
const mongoose = require('mongoose');


//...we create the parameters...
const uri = 'mongodb://127.0.0.1:27017/';
const options = {
    dbName: 'db_brixpi_web',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
    /*  user: '',
    pass: '' */
}


//...recordar que al usar certificado ssl debemos agregar una opción al respecto...

//...connection...
mongoose.connect(uri, options)
    .catch(err => console.log(err));


//...connection event...
mongoose.connection.once('open', () => {
    console.log('The database is connected!');
});


//...connection error events...
mongoose.connection.on('error', err => {
    console.log(err);
});


//...disconnection event...
mongoose.connection.on('close', err => {
    console.log('Disconnected');
});