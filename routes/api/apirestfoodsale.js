var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('./middleware/checkAuth');
const hash = require("hash");

//RUTASDEMODELS
const Usuario = require('../../database/models/usuario') //ruta-usuario

/* 
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        try {
            fs.statSync('./uploads/');
        } catch (e) {
            fs.mkdirSync('./uploads/');
        }
        cb(null, './uploads/');
    },
    filename: (res, file, cb) => {
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        return cb(null, true);
    }
    return cb(new Error('Solo se admiten imagenes png y jpg jpeg'));
} 
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})*/

//GETusuario
router.get('/', function (req, res, next) {
    Usuario.find().exec()
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
//POSTusuario
/* save users. */
router.post('/', function (req, res, next) {

    /*var data1 = req.body;
    console.log(data1);
    var nombre_reg = /\w{3,}/g
    var email_reg = /\w{1,}@{\w.}{1,}[.]{\w}{2,3}/g
    var password_reg = /\w{6,}/g

    if(data.nombre.match(nombre_reg) == null) {
        res.status(300).json({
            msns: "su nombre de usuario no corresponde a nuestra validacion "
        });
      return;
    }
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
*/


    if (req.body.email == "" && req.body.password == "") {
        res.status(400).json({
          "msn" : "formato incorrecto"
        });
        return;
    }

    let usuarioData = {
        nombre: req.body.nombre,
        ci: req.body.ci,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono,
        log: req.body.log,
        lat: req.body.lat,
        foto: req.body.foto,
    };

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            usuarioData.password = hash;
            var modelUsuario = new Usuario(usuarioData);
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
router.post('/login', (req, res, next) => {
    Usuario.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY || 'secret321', {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successfull",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//PATCHusuario
router.patch('/:id', function (req, res, next) {
    let idUsuario = req.params.id;
    let usuarioData = {};
    Object.keys(req.body).forEach((key) => {
        usuarioData[key] = req.body[key];
    })

    Usuario.findByIdAndUpdate(idUsuario, usuarioData).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Se actualizaron los datos"

            })
        }
    })
});
//DELETEusuario
router.delete('/:id', function (req, res, next) {
    let idUsuario = req.params.id;

    Usuario.remove({
        _id: idUsuario
    }).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Usuario eliminado",
                result: result
            })
        }
    })
});
module.exports = router;
