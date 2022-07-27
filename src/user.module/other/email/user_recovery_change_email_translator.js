const translator = (lang) => {
    let language;

    switch (true) {
        case (lang === 'es'):
            language = {
                legend: 'Tu nueva experiencia digital',
                hello: 'Hola',
                hello2: '¡bienvenido a brixpi!',
                text1: '¡Tu cambio de contraseña ha finalizado correctamente!',
                text2: 'Si tienes dudas estamos a tu disposición. ¡Muchas gracias!',
                text3: 'Equipo de brixpi',
                info1: 'Recibes este correo electrónico porque has finalizado correctamente tu proceso de cambio de contraseña. Si tienes dudas, completa el formulario de contacto, o bien envíanos un email a info@brixpi.com.',
                subject1: 'Hola',
                subject2: '¡Tu proceso de cambio de contraseña ha finalizado correctamente!',





                /* hello: 'Hola',
                hello2: '¡bienvenido a brixpi!',
                text1: '¡Tu registración ha finalizado correctamente!',
                text2: 'Si tienes dudas estamos a tu disposición.',
                text3: '¡Muchas gracias!',
                text4: 'Equipo de brixpi',
                info1: 'Recibes este correo electrónico porque has finalizado correctamente tu proceso de registración. Si tienes dudas, completa el formulario de contacto, o bien envíanos un email a info@brixpi.com.',
                subject1: 'Hola',
                subject2: '¡Tu registración en brixpi ha finalizado correctamente!', */




                /* 
                hello: 'Hola',
                hello2: '¡bienvenido a brixpi!',
                text1: '¡Tu registración ha comenzado correctamente!.',
                text2: 'Para continuar y finalizar, copia el siguiente código y pégalo en el casillero correspondiente',
                text3: 'Código',
                text4: 'Si tienes dudas envíanos un email y nos contactaremos a la brevedad.',
                text5: '¡Muchas gracias!',
                text6: 'Equipo de brixpi',
                info1: 'Recibes este correo electrónico porque has iniciado el proceso de registración. Si tienes dudas, completa el formulario de contacto, o bien envíanos un email a info@brixpi.com.',
                subject1: 'Hola',
                subject2: '¡Gracias por registrarte!' */



                /* register: 'REGISTRATE PARA RECIBIR NUESTROS NEWSLETTERS GRATIS',
                hello: 'Hola',
                hello2: 'bienvenido a brixpi',
                text1: 'Hemos recibido tu mensaje',
                text2: 'Te responderemos a la brevedad. ¡Muchas gracias!',
                info1: 'Recibes este correo electrónico porque nos has enviado un mensaje por el formulario de contacto. ' +
                    'Si aún no te has registrado, te invitamos a hacerlo por',
                info2: 'aquí',
                info3: 'Una vez completada tu registración puedes elegir recibir nuestro newsletter de forma periódica.',
                subject1: 'Hola',
                subject2: 'gracias por contactarnos' */
            }
            break;

        default: 
            language = {
                legend: 'Your new digital experience',
                hello: 'Hello',
                hello2: 'welcome to brixpi!',
                text1: 'Your password change has been successfully completed!',
                text2: 'If you have questions, we are at your disposal. Thank you very much!',
                text3: 'brixpi team',
                info1: 'You are receiving this email because you have successfully completed your password change process. If you have questions, complete the contact form, or send us an email to info@brixpi.com.',
                subject1: 'Hello',
                subject2: 'Your password change process has been successfully completed!',







                /* hello: 'Hello',
                hello2: 'welcome to brixpi!',
                text1: 'Your registration has been successfully completed!',
                text2: 'If you have questions, we are at your disposal.',
                text3: 'Thank you very much!',
                text4: 'brixpi team',
                info1: 'You are receiving this email because you have successfully completed your registration process. If you have questions, complete the contact form, or send us an email to info@brixpi.com.',
                subject1: 'Hello',
                subject2: 'Your brixpi registration has been successfully completed!', */




                /* 
                hello: 'Hello',
                hello2: 'welcome to brixpi!',
                text1: 'Your registration has started successfully!.',
                text2: 'To continue and finish, copy the following code and paste it in the corresponding box.',
                text3: 'Code',
                text4: 'If you have questions, send us an email and we will contact you as soon as possible.',
                text5: 'Thank you very much!',
                text6: 'brixpi team',
                info1: 'You are receiving this email because you have started the registration process. If you have questions, complete the contact form, or send us an email to info@brixpi.com.',
                subject1: 'Hello',
                subject2: 'Thanks for registering!' */








                /* register: 'SIGN UP TO RECEIVE OUR FREE NEWSLETTERS',
                hello: 'Hello',
                hello2: 'welcome to brixpi',
                text1: 'We have received your message',
                text2: 'We will respond to you shortly. Thank you very much!',
                info1: 'You are receiving this email because you have sent us a message through the contact form. ' + 
                    'If you have not yet registered, we invite you to do so',
                info2: 'here',
                info3: 'Once you have completed your registration you can choose to receive our newsletter periodically.',
                subject1: 'Hello',
                subject2: 'Thank you for contacting us' */
            }
            break;
    }
    return language;
}

//...we export the translator...
module.exports = {
    translator
}