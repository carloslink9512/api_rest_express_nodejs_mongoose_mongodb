const translator = (lang) => {
    let language;

    switch (true) {
        case (lang === 'es'):
            language = {
                legend: 'Tu nueva experiencia digital',
                register: 'REGISTRATE PARA RECIBIR NUESTROS NEWSLETTERS GRATIS',
                hello: 'Hola',
                hello2: '¡bienvenido a brixpi!',
                text1: 'Hemos recibido tu mensaje',
                text2: 'Te responderemos a la brevedad. ¡Muchas gracias!',
                info1: 'Recibes este correo electrónico porque nos has enviado un mensaje por el formulario de contacto. ' +
                    'Si aún no te has registrado, te invitamos a hacerlo por',
                info2: 'aquí',
                info3: 'Una vez completada tu registración puedes elegir recibir nuestro newsletter de forma periódica.',
                subject1: 'Hola',
                subject2: 'gracias por contactarnos'
            }
            break;

        default: 
            language = {
                legend: 'Your new digital experience',
                register: 'SIGN UP TO RECEIVE OUR FREE NEWSLETTERS',
                hello: 'Hello',
                hello2: 'welcome to brixpi!',
                text1: 'We have received your message',
                text2: 'We will respond to you shortly. Thank you very much!',
                info1: 'You are receiving this email because you have sent us a message through the contact form. ' + 
                    'If you have not yet registered, we invite you to do so',
                info2: 'here',
                info3: 'Once you have completed your registration you can choose to receive our newsletter periodically.',
                subject1: 'Hello',
                subject2: 'Thank you for contacting us'
            }
            break;
    }
    return language;
}

//...we export the translator...
module.exports = {
    translator
}