var express = require('express');
var router = express.Router();
//RUTASDEMODELS
//const Detail= require('../../database/models/detaill') //ruta-menu



router.post('/', function (req, res, next) {

let detailsData = {
          idmenu: req.body.  idmenu,
        idorden: req.body.idorden,
        cantidad: req.body.cantidad,

    }

    let data = new Detail(detailsData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "mdetalle guardado",
                doc: docs
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

router.get('/', function (req, res, next) {
    Detail.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay detalles  en la BD"
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


module.exports = router;
