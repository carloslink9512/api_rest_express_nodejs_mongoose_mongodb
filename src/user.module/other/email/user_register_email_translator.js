const translator = (lang) => {
    let language;

    switch (true) {
        case (lang === 'es'):
            language = {
                legend: 'Tu nueva experiencia digital',
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
                subject2: '¡Gracias por registrarte!'
            }
            break;

        default: 
            language = {
                legend: 'Your new digital experience',
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
                subject2: 'Thanks for registering!'
            }
            break;
    }
    return language;
}

//...we export the translator...
module.exports = {
    translator
}