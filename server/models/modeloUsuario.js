const mongoose = require('mongoose');
var validator = require('validator');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    correo: {type: String, required: true, validate: validator.isEmail},
    pass: {type:String, required:true},
    nombre: {type: String, required: true, minlength: 3, maxlength: 50},
    apellido: {type: String, required: true, minlength: 3, maxlength: 50},
    descripcion: {type: String, maxlength: 300},
    telefono: {type: Number, maxlength:10},
    rutas:[{type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required:false}]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;