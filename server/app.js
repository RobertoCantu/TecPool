const express = require('express');
const mongoose = require('mongoose');

const hostname = 'localhost';
const port = 3000;
const app = express();

/*
app.get("/", (req, res) => {
    res.send("Hello World");
})
*/

mongoose
    .connect(
        'mongodb+srv://Gustavo:test@tecpools.zupv8.mongodb.net/TecPools?retryWrites=true&w=majority'
        )
    .then
        (()=>{
            console.log('Conexion a MongoDB exitosa')
        });


app.listen(port, hostname, ()=> {
    console.log(`Corriendo en http://${hostname}:${port}/`);
});