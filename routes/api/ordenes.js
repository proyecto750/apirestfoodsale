var express = require('express');
var router = express.Router();
//RUTASDEMODELS
const Orden = require('../../database/models/orden') //ruta-orden
//GETorden
router.get('/', function (req, res, next) {
    Orden.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay orden en la BD"
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
//POSTordenes
/* save ordenes*/
router.post('/', function (req, res, next) {

    const datos = {
        cliente: req.body.idCliente,
        lugarEnvio: req.body.lugarEnvio,
        restaurant:req.body.idRestaurant,
        menus  :req.body.menus,
        cantidad : req.body.cantidad,
        precios : req.body.precios,
    };

    let precios = req.body.precios;
    let cantidad = req.body.cantidad;

    let pagoTotal = 0;
    for (let index = 0; index < precios.length ; index++){
        pagoTotal += precios[index]*cantidad[index];
    };

    datos.cantidad = cantidad;
    datos.pagoTotal = pagoTotal;


    var modelOrden = new Orden(datos);
    modelOrden.save()
        .then(res.json({
                message: "Orden insertado "

            })
        ).catch(err => {

            res.status(500).json({
                error: err
            })
        });
});

//DELETEmenu
router.delete('/:id', function (req, res, next) {
    let idOrden = req.params.id;

    Orden.remove({
        _id: idOrden
    }).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Orden eliminado eliminado",
                result: result
            })
        }
    })
});


router.patch('/:id', function (req, res, next) {
    let idOrden = req.params.id;
    let ordenData = {};
    Object.keys(req.body).forEach((key) => {
        ordenData[key] = req.body[key];
    })

    Orden.findByIdAndUpdate(idOrden, ordenData).exec((err, result) => {
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

module.exports = router;
