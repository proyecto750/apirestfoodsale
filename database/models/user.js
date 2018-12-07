const mongoose = require('../connect');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: 'Falta el email',
        match: /^(([^<>()\[\]\.,;:\s @\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
     password: String,
   
})

const user = mongoose.model('User', userSchema);

module.exports = user;
