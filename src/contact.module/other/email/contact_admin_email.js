'use strict';

//...we import libraries...
const nodemailer = require('nodemailer');


//...we import the email config...
const { emailConfig } = require('./contact_config');


//...we import the translator...
const { translator } = require('./contact_admin_email_translator');


async function sendEmail(dataContact, dataCommentary){

    //...we import the language...
    const siteLanguage = dataCommentary.language;

    try {

        //.....................................................

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

                    <div style="width: 100%; background-color: white; display: flex; justify-content: center; flex-wrap: wrap;">
                        <div style="width: 100%; height: auto; padding: 0 10px;">
                            <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text1}:</p>
                        </div>

                        <div style="width: 100%; height: auto; padding: 0 10px;">
                            <ul style="width: 100%;">
                                <li style="padding: 3px 0"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1);text-align: left; font-weight: bold; margin-right: 15px;">${translator(siteLanguage).name}:</span><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1);text-align: left;">${dataContact.name}</span></li>
                                <li style="padding: 3px 0"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1);text-align: left; font-weight: bold; margin-right: 15px;">${translator(siteLanguage).email}:</span><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1);text-align: left;">${dataContact.email}</span></li>
                                <li style="padding: 3px 0"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1);text-align: left; font-weight: bold; margin-right: 15px;">${translator(siteLanguage).phone}:</span><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1);text-align: left;">${dataContact.phone}</span></li>                        
                            </ul>
                        </div>

                        <div style="width: 100%; height: auto; padding: 0 10px;">
                            <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text2}:</p>
                        </div>
                        <div style="width: 80%; background-color: white; border-top: solid 1px rgba(238, 232, 241,1); padding: 0 10px;">
                            <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgba(0,0,0,1); font-style: italic; line-height: 22px;">
                                <span>"</span>
                                    ${dataCommentary.commentary}
                                <span>"</span>
                            </p>
                        </div>

                        <div style="width: 100%; height: auto; padding: 0 10px;">
                            <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(0,0,0,1); text-align: left;">${translator(siteLanguage).text3}.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;


        //.....................................................
        

        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: false, //...sin ssl
            auth: {
                user: emailConfig.address,
                pass: emailConfig.pass
            },
            tls: {  //...only for development...
                rejectUnauthorized: false
            }
        });

        const result = await transporter.sendMail({
            //...la cuenta 'from' es nuestra cuenta de envío...
            //...'to' destination user...
            from: `Charly <${emailConfig.address}>`,
            to: 'sistema@sistema.com',
            subject: `${translator(siteLanguage).subject}`,
            //...text: 'probando datos'...
            html: contentHtml
        });


        if (result === null) return {code: 'CONT0025'};

        return {code: 'CONT0026'};
    }
    catch (error) {
        return {code: 'CONT0024'};
    }
}


//...we export module...
module.exports = {
    sendEmail
}