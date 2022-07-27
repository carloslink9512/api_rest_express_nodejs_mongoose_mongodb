const translator = (lang) => {
    let language;

    switch (true) {
        case (lang === 'es'):
            language = {
                legend: 'Tu nueva experiencia digital',
                hello: 'Hola',
                hello2: '¡bienvenido a brixpi!',
                text1: '¡Tu registración ha finalizado correctamente!',
                text2: 'Si tienes dudas estamos a tu disposición.',
                text3: '¡Muchas gracias!',
                text4: 'Equipo de brixpi',
                info1: 'Recibes este correo electrónico porque has finalizado correctamente tu proceso de registración. Si tienes dudas, completa el formulario de contacto, o bien envíanos un email a info@brixpi.com.',
                subject1: 'Hola',
                subject2: '¡Tu registración en brixpi ha finalizado correctamente!',
            }
            break;

        default: 
            language = {
                legend: 'Your new digital experience',
                hello: 'Hello',
                hello2: 'welcome to brixpi!',
                text1: 'Your registration has been successfully completed!',
                text2: 'If you have questions, we are at your disposal.',
                text3: 'Thank you very much!',
                text4: 'brixpi team',
                info1: 'You are receiving this email because you have successfully completed your registration process. If you have questions, complete the contact form, or send us an email to info@brixpi.com.',
                subject1: 'Hello',
                subject2: 'Your brixpi registration has been successfully completed!',
            }
            break;
    }
    return language;
}

//...we export the translator...
module.exports = {
    translator
}