'use strict';

//...function to try to capture the ip code of the client...
const IpCapture = (data) => {
    const ipCode = data.header('x-forwarded-for') || data.connection.remoteAddress;
    return ipCode;
}

module.exports = {IpCapture};