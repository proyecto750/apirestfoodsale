const mongoose = require('../connect');
const Schema = mongoose.Schema;

const resturantSchema = Schema({
    nombre: String,
    nit: String,
    propietario: String,
    calle: String,
    telefono: Number,
    log: Number,
    lat: Number,
    logo: String,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    fotoLugar: String
})

const restaurant = mongoose.model('Restaurant', resturantSchema);

module.exports = restaurant;
