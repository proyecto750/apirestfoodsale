var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('./middleware/checkAuth');
const hash = require("hash");

const User = require('../../database/models/user') //ruta-user

router.get('/', function (req, res, next) {
    User.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay usuarios en la BD"
                })
            } else {
                res.json({
                    count: docs.length,
                    result: docs,
                    request: {
                        type: "GET"
                    }

                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
router.post('/', function (req, res, next) {

 var data = req.body;
    console.log(data);

    var email_reg = /\w{1,}@[\w.]{1,}[.][\w}]{2,3}/g
    var password_reg = /\w{6,}/g

    
    if(data.email.match(email_reg) == null) {
        res.status(300).json({
            msns: "su email de usuario no corresponde a nuestra validacion "
        });
     return;
    }
    if(data.password.match(password_reg) == null) {
        res.status(300).json({
            msns: "su password de usuario no corresponde a nuestra validacion "
        });
     return;
    }

    let usuarioData = {
        email: data.email,
        password: data.password,
        
    };

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            usuarioData.password = hash;
            var modelUsuario = new User(usuarioData);
            modelUsuario.save().then(result => {
                    res.json({
                        message: "Usuario insertado en la bd"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });


        }
    });

});



    
module.exports = router;