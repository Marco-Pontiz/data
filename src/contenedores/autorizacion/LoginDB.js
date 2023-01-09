const mongoose = require('mongoose');
const loginColletion = 'User-login';

const UserSchema = new mongoose.Schema({
    nombre: {type: 'string', value: true, max: 100},
    password: {type: password, value: true, max: 100}
});

export const Lusers = mongoose.model(UserSchema, loginColletion);