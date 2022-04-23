import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import { whatsapp } from "./utils/twilio.js";
import { transporter } from './utils/nodemailer.js';

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

app.post("/twilio", ()=>{
    whatsapp('8134444000', 'Hello World');
})

app.post('/send-email', ()=>{
    transporter.sendMail({
        from: '"TecPools" <tecpools@outlook.com>',
        to: 'ntw85363@jiooq.com',
        subject: "Bienvenido a TecPools",
        html: "<h1>Bienvenido a TecPools</h1><p>Tu cuenta fue creada exitosamente.</p><p>Inicia sesión en tecpools.tec.mx.<p>",
    }, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(info.response)
    });  
})

app.use(express.json()); // to accept json data
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", 'DELETE', "PUT"],
    credentials: true,
}));

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