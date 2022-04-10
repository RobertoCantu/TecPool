import express from "express";

// Models

import Ruta from "../models/modeloRuta.js";
import User from "../models/userModel.js";

const router = express.Router();

// Endpoints

router.route('/').get((req, res) => {
    Ruta.find()
        .populate('conductor')
        .then(rutas => res.json(rutas))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    Ruta.create({
        conductor: req.body.conductor,
        origen: req.body.origen,
        destino: req.body.destino,
        horaInicio: Number(req.body.horaInicio),
        minutoInicio: Number(req.body.minutoInicio),
        horaLlegada: Number(req.body.horaLlegada),
        minutoLlegada: Number(req.body.minutoLlegada)
    })
        .then(ruta => {
            return User.findById('623d36427bb1f24babdb3051').then(usuario => {
                usuario.rutas.push(ruta.id);
                return usuario.save();
            })
        })
        .then(() => res.json("Ruta creada."))

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

router.route('/:id').post((req, res) => {
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

export default router;