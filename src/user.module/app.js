'use strict';

const express = require('express');
const path = require('path');
const app = express();

//...setup...
app.set('port', process.env.PORT || 20101);

//...middleware...
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());

//...routes..
const router = require('./route/routes');
app.use(router);

//...server...
app.listen(app.get('port'), () => {
    console.log('Servidor de usuarios corriendo en puerto: ', app.get('port'));
});

//...we export the module...
module.exports = app;