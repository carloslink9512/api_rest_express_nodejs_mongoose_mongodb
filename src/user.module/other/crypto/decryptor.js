const CryptoJs = require('crypto-js');

const decryptor = (pass) => {
    const secret = 'brix2150coco';
    let bytes = CryptoJs.AES.decrypt(pass, secret);
    let decipherText = bytes.toString(CryptoJs.enc.Utf8);
    return decipherText;
}

//...we export the function...
module.exports = {
    decryptor
}