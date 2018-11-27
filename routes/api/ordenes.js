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
/* save ordenes. aun no probado por postam por que necesita testeo*/
/*router.post('/', function (req, res, next) {

    let ordenData = {
        cliente: req.body.idCliente,
        lugarEnvio: req.body.lugarEnvio,
        restaurant:req.body.idRestaurant,
        menus:req.body.menus,
        cantidad: req.body.cantidad,
        precios:req.body.precios,
    }
    
    let precios = req.body.precios;
    let cantidad = req.body.cantidad;
    let pagoTotal = 0;
    for (let index = 0; index < precios.length; index++){
        pagoTotal += precios[index]* cantidad[index];
    } 
    datos.menus = menus;
    datos.cantidad = cantidad;
    datos.pagoTotal = pagoTotal;
    
   
    let data = new Orden(ordenData);
    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "restaurante  guardado",
                doc: docs
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

*/
module.exports = router;