'use strict';


//...we import the libraries...
const nodemailer = require('nodemailer');


//...we import the email config file...
const { emailConfig } = require('../email/user_email_config');


const { translator } = require('./user_register_confim_email_translator');


//...function...
const sendEmail = async (data) => {
    try {

        const siteLanguage = data.language;
        //...datos...

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
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: rgba(0,0,0,0.8); text-align: left;">${translator(siteLanguage).hello} ${data.name}, ${translator(siteLanguage).hello2}</p>
                    </div>

                    <div style="width: 100%; height: auto; padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text1}</p>
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text2}</p>
                    </div>

                    <div style="width: 100%; height: auto; padding: 0 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text3}</p>
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: rgba(0,0,0,1); text-align: left; font-style: italic">${translator(siteLanguage).text4}</p>
                    </div>

                    <div style="width: 70%; background-color: white; border-top: solid 1px rgba(238, 232, 241,1); padding: 10px;">
                        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: rgba(0,0,0,0.6);">
                            ${translator(siteLanguage).info1}
                        </p>
                    </div>
                </div>
            </div>
        `;

        /* let contentHtml = `
            <h3>Hola ${data.name}</h3>
            <p>¡Tu registración ha finalizado correctamente!</p>
            <p>Te invitamos a leer nuestras publicaciones. Queremos conocer tus opiniones.</p>
            <p>Si tienes dudas estamos a tu disposición.</p>
            <p>¡Muchas gracias!</p>
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
            //...la cuenta 'from' es nuestra cuenta de envío...
            //...'to' es el usuario de destino...
            from: `'Charly' <${emailConfig.address}>`,
            to: data.email,
            subject: `${translator(siteLanguage).subject1} ${data.name}, ${translator(siteLanguage).subject2}`,
            //...text: 'probando datos'...
            html: contentHtml
        });

        if (result === null) return {code: 'USER0051'};

        return {code: 'USER0052'};
    }
    catch (error) {
        return {code: 'USER0050'};
    }
}


//...we export the function...
module.exports = {
    sendEmail
}