var express = require('express');
var router = express.Router();
//RUTASDEMODELS
const Menufood = require('../../database/models/menu') //ruta-menu
//GETmenu
router.get('/', function (req, res, next) {
    Menufood.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay menus en la BD"
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
//POSTmenu
/* save menus. */
router.post('/', function (req, res, next) {

    let menuData = {
        restaurant: req.body.restaurant,
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        foto: req.body.foto,
    }

    let data = new Menufood(menuData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "menu guardado",
                doc: docs
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

//PATCHmenu
router.patch('/:id', function (req, res, next) {
    let idMenufood= req.params.id;
    let menuData = {};

    Object.keys(req.body).forEach((key) => {
        menuData[key] = req.body[key];
    })

    Menufood.findByIdAndUpdate(idMenufood, menuData).exec((err, result) => {
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
//DELETEmenu
router.delete('/:id', function (req, res, next) {
    let idMenufood = req.params.id;

    Menufood.remove({
        _id: idMenufood
    }).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Menu eliminado",
                result: result
            })
        }
    })
});
module.exports = router;
