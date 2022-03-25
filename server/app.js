const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const rutasRouter = require('./routes/rutas');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const hostname = 'localhost';
const port = 3000;
const URI = process.env.DB_URI

app.use(express.json());
app.use('/rutas', rutasRouter);
app.use('/usuarios', usuariosRouter)

mongoose
    .connect(URI)
    .then(() => {
        console.log('Conexion a MongoDB exitosa')
    });


app.listen(port, hostname, () => {
    console.log(`Corriendo en http://${hostname}:${port}/`);
});