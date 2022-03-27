import express from "express";

// Controllers

import {
  authUser,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

// Endpoints

router.route('/createUser').post(createUser);
router.route('/login').post(authUser);

/*
router.route('/').get((req, res) => {
    Usuario.find()
        .populate('rutas')
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const correo = req.body.correo;
    const pass = req.body.pass;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const descripcion = req.body.descripcion;
    const telefono = Number(req.body.telefono);
    const rutas = [];

    const newUsuario = new Usuario({correo, pass, nombre, apellido, descripcion, telefono, rutas});

    newUsuario.save()
        .then(() => res.json('Usuario agregado'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Usuario.findById(req.params.id)
        .then(usuario => res.json(usuario))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(usuario => res.json('Usuario borrado'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(usuario => {
        usuario.correo = req.body.correo;
        usuario.pass = req.body.pass;
        usuario.nombre = req.body.nombre;
        usuario.apellido = Number(req.body.apellido);
        usuario.descripcion = Number(req.body.descripcion);
        usuario.telefono = Number(req.body.telefono);

        usuario.save()
            .then(() => res.json('Usuario actualizado'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
*/

export default router;