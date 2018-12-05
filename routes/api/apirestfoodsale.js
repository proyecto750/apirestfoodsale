var express = require('express');
var router = express.Router();
//RUTASDEMODELS
const Usuario = require('../../database/models/usuario') //ruta-usuario
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
    }

    let data = new Usuario(usuarioData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "usuario guardado",
                doc: docs
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});
//PATCHusuario
router.patch('/:id', function (req, res, next) {
    let idUser = req.params.id;
    let userData = {};
    Object.keys(req.body).forEach((key) => {
        userData[key] = req.body[key];
    })

    Usuario.findByIdAndUpdate(idUser, userData).exec((err, result) => {
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
    let idUser = req.params.id;

    Usuario.remove({
        _id: idUser
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
