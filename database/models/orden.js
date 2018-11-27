const mongoose = require('../connect');
const Schema = mongoose.Schema;

const ordenSchema = Schema({
    idCliente: {type: Schema.Types.ObjectId,ref:"Usuario"},
    lugarEnvio:[Number],
    restaurant:{type: Schema.Types.ObjectId,ref:"Restaurant"},
    menus: {type: Schema.Types.ObjectId,ref:"Menufood"},
    cantidad: [Number],
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    pagototal: String
})

const orden = mongoose.model('Orden', ordenSchema);

module.exports = orden;
