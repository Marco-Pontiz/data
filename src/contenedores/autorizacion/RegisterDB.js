const mongoose = require('mongoose');
const registerCollection = 'User-register';

const UsuariosSchema = new mongoose.Schema ({
    nombre: {type: 'string', require: true, max: 100},
    password: {type: password, require: true, max: 20},
    direccion: {type: 'string', require: true, max: 500}
})

export const Rusers = mongoose.model(registerCollection, UsuariosSchema);