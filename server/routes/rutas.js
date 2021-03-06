import express from "express";
import { checkAuth } from "../middlewares/auth.js"
import { checkUser } from "../middlewares/auth.js";

// Models

import Ruta from "../models/modeloRuta.js";
import User from "../models/userModel.js";

const router = express.Router();

router.use(checkAuth);

// Endpoints

router.route('/').get((req, res) => {
  Ruta.find()
    .then(rutas => res.json(rutas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  Ruta.create({
    conductor: req.body.conductor,
    origen: req.body.origen,
    horaLlegada: req.body.horaLlegada,
    asientos: Number(req.body.asientos),
    gasolina: Boolean(req.body.gasolina),
    dias: req.body.dias
  })
  .then(ruta => {
    return User.findById(req.body.conductor).then(usuario => {
      usuario.routes.push(ruta.id);
      return usuario.save();
    })
  })
  .then(() => res.json("Ruta creada."))
});

router.route('/:id').get((req, res) => {
  Ruta.findById(req.params.id)
    .populate('conductor')
    .then(ruta => res.json(ruta))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').get(checkUser, (req, res) => {
  Ruta.findById(req.params.id)
    .populate('conductor')
    .then(ruta => res.json(ruta))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(checkUser, (req, res) => {
  Ruta.findByIdAndDelete(req.params.id)
    .then(ruta => res.json('Ruta borrada'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post(checkUser, (req, res) => {
  Ruta.findById(req.params.id)
    .then(ruta => {
      ruta.conductor = req.body.conductor;
      ruta.origen = req.body.origen;
      ruta.horaLlegada = req.body.horaLlegada;
      ruta.asientos = Number(req.body.asientos);
      ruta.gasolina = Boolean(req.body.gasolina);
      ruta.dias = req.body.dias;
      ruta.save()
        .then(() => res.json('Ruta actualizada'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

export default router;