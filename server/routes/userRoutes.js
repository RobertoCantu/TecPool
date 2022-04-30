import express from "express";

//Models
import Ruta from "../models/modeloRuta.js";
import User from "../models/userModel.js";

// Controllers

import {
  authUser,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

// Endpoints

router.route('/createUser').post(createUser);
router.route('/login').post(authUser);


router.route('/').get((req, res) => {
    User.find()
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const descripcion = req.body.descripcion;
    const phone = Number(req.body.phone);
    const routes = [];

    const newUser = new User({email, password, name, lastName, descripcion, phone, routes});

    newUser.save()
        .then(() => res.json('User agregado'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .populate({path:'routes', strictPopulate: false})
        .then(usuario => res.json(usuario))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Ruta.deleteMany({conductor: req.params.id});
  User.findByIdAndDelete(req.params.id)
    .then(usuario => res.json('User borrado'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(usuario => {
        usuario.email = req.body.email;
        usuario.password = req.body.password;
        usuario.name = req.body.name;
        usuario.lastName = Number(req.body.lastName);
        usuario.descripcion = Number(req.body.descripcion);
        usuario.phone = Number(req.body.phone);

        usuario.save()
            .then(() => res.json('User actualizado'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


export default router;