const translator = (lang) => {
    let language;

    switch (true) {
        case (lang === 'es'):
            language = {
                legend: 'Tu nueva experiencia digital',
                text1: 'El siguiente usuario ha enviado un mensaje',
                text2: 'Su mensaje',
                text3: 'Recordar que este es un correo de soporte. El mensaje se encuentra registrado',
                name: 'Nombre',
                email: 'Correo electrónico',
                phone: 'Teléfono',


                subject: 'Recibimos un mensaje del formulario de contactos'
                /* title1: 'Información del contacto',
                name: 'Nombre',
                email: 'Correo electrónico',
                phone: 'Teléfono',
                title2: 'Comentario',
                footer1: 'Este email corresponde a un mensaje del usuario por formulario de contactos',
                 */
            }
            break;

        default: 
            language = {
                legend: 'Your new digital experience',
                text1: 'The following user has sent a message',
                text2: 'Your message',
                text3: 'Remember that this is a support email. The message is registered',
                name: 'Name',
                email: 'Email',
                phone: 'Phone',



                subject: 'We received a message from the contact form'



                /* title1: 'Contact information',
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                title2: 'Comment',
                footer1: 'This email corresponds to a message from the user through the contact form',
                 */
            }
            break;
    }
    return language;
}

//...we export the translator...
module.exports = {
    translator
}