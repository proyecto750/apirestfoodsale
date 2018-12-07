const mongoose = require('../connect');
const Schema = mongoose.Schema;

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'debe poner un nombre']
    },

    ci: {
        type: String,
        required: [true, 'Falta el CI']
    },
    email: {
        type: String,
        required: 'Falta el email',
        match: /^(([^<>()\[\]\.,;:\s @\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },

    password: String,

    telefono: Number,

    log: Number,
    lat: Number,

    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    foto: String,
    tipo: String //tipo de usuario,cliente,dueño,cocinero
})

const usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = usuario;
