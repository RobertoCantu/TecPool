const router = require('express').Router();
let Ruta = require('../models/ruta.js');

router.route('/').get((req, res) => {
    Ruta.find()
        .then(rutas => res.json(rutas))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    //testing conductor
    const conductor = req.body.conductor;
    const origen = req.body.origen;
    const destino = req.body.destino;
    const horaInicio = Number(req.body.horaInicio);
    const minutoInicio = Number(req.body.minutoInicio);
    const horaLlegada = Number(req.body.horaLlegada);
    const minutoLlegada = Number(req.body.minutoLlegada);

    const newRuta = new Ruta({conductor, origen, destino, horaInicio, minutoInicio, horaLlegada, minutoLlegada});

    newRuta.save()
        .then(() => res.json('Ruta agregada'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Ruta.findById(req.params.id)
        .then(ruta => res.json(ruta))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Ruta.findByIdAndDelete(req.params.id)
        .then(ruta => res.json('Ruta borrada'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Ruta.findById(req.params.id)
        .then(ruta => {
            ruta.conductor = req.body.conductor;
            ruta.origen = req.body.origen;
            ruta.destino = req.body.destino;
            ruta.horaInicio = Number(req.body.horaInicio);
            ruta.minutoInicio = Number(req.body.minutoInicio);
            ruta.horaLlegada = Number(req.body.horaLlegada);
            ruta.minutoLlegada = Number(req.body.minutoLlegada);
            
            ruta.save()
                .then(() => res.json('Ruta actualizada'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;