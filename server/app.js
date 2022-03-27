import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Middlewares

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Routes

import rutasRouter from "./routes/rutas.js";
import userRoutes from "./routes/userRoutes.js";

// Environment variables

const PORT = process.env.PORT;
const URI = process.env.DB_URI
const hostname = 'localhost';

const app = express();

app.use(express.json()); // to accept json data

app.use('/rutas', rutasRouter);
app.use('/users', userRoutes)

app.use(notFound);
app.use(errorHandler);

mongoose
    .connect(URI)
    .then(() => {
        console.log('Conexion a MongoDB exitosa')
    });


app.listen(PORT, hostname, () => {
    console.log(`Corriendo en http://${hostname}:${PORT}/`);
});