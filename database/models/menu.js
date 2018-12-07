const mongoose = require('../connect');
const Schema = mongoose.Schema;

const menufoodSchema = Schema({
    restaurant: {
        type:Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    nombre: String,
    precio: {
        type:Number,
        default:1
    },
    descripcion: String,
    fechaRegistro:
    {
        type: Date,
        default: Date.now()
    },
    fotomenu: String
    
})

const menu = mongoose.model('Menufood', menufoodSchema);

module.exports = menu;
