'use strict';

exports.codeGenerator = () => {
    let count = 40;
    let str = '';
    let ref = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < count; i++){
        str += ref.charAt(Math.floor(Math.random()*ref.length));
    }
    const xCode = str;

    return xCode;
}