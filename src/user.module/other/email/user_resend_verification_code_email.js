'use strict';

//...we import libraries...
const nodemailer = require('nodemailer');

//...we import the email config...
const { emailConfig } = require('./user_email_config');

const { translator }  = require('./user_resend_verification_code_email_translator');

const sendEmail = async (data) => {
    try {

        //...we import the language...
        const siteLanguage = data.languageParam;
        //.............................................

        let contentHtml = `
            <div style="width: 100%; display: flex; justify-content: center; flex-wrap: wrap;">
                <div style="width: 100%; display: flex; justify-content: center; flex-wrap: wrap; background: linear-gradient(150deg, rgb(138,43,226), rgba(138,43,226,0.5));">
                    <div style="width: 100%; height: 120px; display: flex; justify-content: center; align-items: center;">
                        <div style="margin: 5px; width: 100%; text-align: center;">
                            <a href="http://www.google.com.ar" style="font-family: Arial, Helvetica, sans-serif; color: white; font-size: 40px; text-decoration: none; display: block;" >brixpi</a>
                            <span style="font-family: Arial, Helvetica, sans-serif; color: white; font-size: 16px;">${translator(siteLanguage).legend}</span>
                        </div>
                        <div style="margin: 5px; width: 100%; text-align: center;">
                            <a style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; color: rgb(255,255,255); display: block; padding: 4px 0; font-weight: bold;">C L O C K</a>
                            <a style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; color: rgb(255,255,255); display: block; padding: 4px 0; font-weight: bold;">C A L C U L A T O R</a>
                            <a style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; color: rgb(255,255,255); display: block; padding: 4px 0; font-weight: bold;">D I A R Y</a>
                        </div>
                    </div>
                </div>

                <div style="width: 100%; background-color: white; display: flex; justify-content: center; flex-wrap: wrap;">

                    <div style="width: 100%; height: auto; padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: rgba(0,0,0,0.8); text-align: left;">${translator(siteLanguage).hello} ${data.nameParam}, ${translator(siteLanguage).hello2}</p>
                    </div>

                    <div style="width: 100%; height: auto; padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: rgba(0,0,0,0.8); text-align: left; font-style: italic;">${translator(siteLanguage).text7}</p>
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: rgba(0,0,0,0.8); text-align: left; font-style: italic;">${translator(siteLanguage).text8}</p>
                    </div>

                    <div style="width: 100%; height: auto; padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text1}</p>
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text2}:</p>
                    </div>

                    <div style="width: 100%; height: auto; padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text3}:</p>
                    </div>

                    <div style="width: 80%; background-color: white; border-top: solid 1px rgba(238, 232, 241,1); padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1); font-style: italic; line-height: 22px;">
                            ${data.codeSendParam}
                        </p>
                    </div>

                    <div style="width: 100%; height: auto; padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text4}</p>
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text5}</p>
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: rgba(0,0,0,1); text-align: left; font-style: italic">${translator(siteLanguage).text6}</p>
                    </div>

                    <div style="width: 70%; background-color: white; border-top: solid 1px rgba(238, 232, 241,1); padding: 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: rgba(0,0,0,0.6);">
                            ${translator(siteLanguage).info1}
                        </p>
                    </div>
                </div>
            </div>
        `;



        //............................................
        /* let contentHtml = `
            <h3>Hola ${data.nameParam}</h3>
            <p>Tu registraci??n ha comenzado correctamente!. Para continuar y finalizar, copia el siguiente c??digo 
            y p??galo en el casillero correspondiente.
            </p>
            <p>C??DIGO:</p>
            <p>${data.codeSendParam}</p>
            <p>Si tienes dudas env??anos un email y nos contactaremos a la brevedad. Muchas gracias!</p>
        `; */

        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: false, //...sin ssl...
            auth: {
                user: emailConfig.address,
                pass: emailConfig.pass
            },
            tls: {  //...solo para pruebas...
                rejectUnauthorized: false
            }
        });

        const result = await transporter.sendMail({
            //...la cuenta 'from' es nuestra cuenta de env??o...
            //...'to' es el usuario de destino...
            from: `'Charly' <${emailConfig.address}>`,
            to: data.emailParam,
            subject: `${translator(siteLanguage).subject1} ${data.nameParam}, ${translator(siteLanguage).subject2}`,
            //...text: 'probando datos'...
            html: contentHtml
        });

        if (result === null) return {code: 'USER0062'};

        return {code: 'USER0063'};
    }
    catch (error) {
        return {code: 'USER0061'};
    }
}

//...we export the module...
module.exports = {
    sendEmail
}