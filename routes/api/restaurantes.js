var express = require('express');
var router = express.Router();
//RUTASDEMODELS
const Restaurant = require('../../database/models/restaurant') //ruta-restaurant
//GETrestaurant
router.get('/', function (req, res, next) {
    Restaurant.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay restaurant en la BD"
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
//POSTrestaurant
/* save restaurant. */
router.post('/', function (req, res, next) {

    let restaurantData = {
        nombre: req.body.nombre,
        nit: req.body.nit,
        propietario: req.body.propietario,
        calle: req.body.calle,
        telefono: req.body.telefono,
        log: req.body.log, //cadena
        lat: req.body.lat,
       // logo:req.body.logo,
       // fotoLugar: req.body.fotoLugar,

        
    }

    const data = new Restaurant(restaurantData);
    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "restaurante guardado",
                doc: docs
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
