const mongoose = require('../connect');
const Schema = mongoose.Schema;

const menufoodSchema = Schema({
    nombre: String,
    precio: String,
    descripcion: String,
    fechaRegistro:
    {
        type: Date,
        default: Date.now()
    },
    fotoproducto: String
    //tipo de usuario
})

const menus = mongoose.model('Menufood', menufoodSchema);

module.exports = menus;
