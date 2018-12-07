const mongoose = require('mongoose');
//let uri = 'mongodb://${user}:${pass}@${host}:{port}';
mongoose.connect("mongodb://127.0.0.1:27017/foodsale", {
    useNewUrlParser: true
}).then(() => {
    console.log('conexion a mongodb exitosa');
}).catch(err => {
    console.log('Error en la conexion hacia mongo DB');
});

module.exports = mongoose;