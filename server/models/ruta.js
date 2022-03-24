const mongoose = require('mongoose');
var validator = require('validator');

const Schema = mongoose.Schema;

const rutaSchema = new Schema({
    //Conductor: {type: Schema.Types.ObjectId, ref: "Usuario"},
    conductor: {type: String, required: true},
    origen: {type: String, required: true, validate: validator.isLatLong},
    destino: {type: String, required: true, validate: validator.isLatLong},
    horaInicio: {type: Number, required: true, min: 0, max: 23},
    minutoInicio: {type: Number, required: true, min: 0, max: 59},
    horaLlegada: {type: Number, required: true, min: 0, max: 23},
    minutoLlegada: {type: Number, required: true, min: 0, max: 59}
});

const Ruta = mongoose.model('Ruta', rutaSchema);
module.exports = Ruta;