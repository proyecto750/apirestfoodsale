const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/foodsale").then(() => {
    console.log('conexion exitosa');
}).catch((err) => {
    console.log('error', err);
});

module.exports = mongoose;
