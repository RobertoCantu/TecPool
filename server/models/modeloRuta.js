import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const rutaSchema = new Schema({
    conductor: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
    origen: {type: String, required: true},
    //horaInicio: {type: Number, required: true, min: 0, max: 23},
    //minutoInicio: {type: Number, required: true, min: 0, max: 59},
    horaLlegada: {type: String, required: true},
    //minutoLlegada: {type: Number, required: true, min: 0, max: 59},
    asientos: {type: Number, required: true, min: 0, max: 6},
    gasolina: {type: Boolean, required: true},
    dias: [{type:String, 
        enum:['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    }]
});

const Ruta = mongoose.model('Ruta', rutaSchema);

export default Ruta;