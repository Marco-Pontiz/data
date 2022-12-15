import mongoose from 'mongoose';

await mongoose.connect('mongodb://localhost:27017/Desafio'),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}
console.log('Database MongoDB Connected')

const carritoCollection = 'Carrito'

const carritoSchema = new mongoose.Schema({
    usuario: {type: String, require: true, max: 100},
    producto: {type: String, require: true, max: 100},
})

export const carritoModel = mongoose.model(carritoCollection, carritoSchema)

/* Creater Carrito*/

const usuarios_compras = [
    {
        usuario: 'Marco',
        producto: "Sony Play Station 5"
    },
    {
        usuario: 'Stefano',
        producto: 'Microsoft Xbox Series S'
    },
    {
        usuario: 'Juan',
        producto: 'Sony Play Station 4'
    }
]

const inserciones = [];

for (const carrito of usuarios_compras){
    inserciones.push(carritoModel.create(carrito))
}

const results = await Promise.all(inserciones)
const rejected = results.filter(results => results. status === 'rejected')

if(rejected.length > 0){
    console.log('Error al insertar al carrito')
    console.log(rejected)
}else{
    console.log(inserciones)
}

/* Read all */ 
console.log('Reading all...')
const ra_carrito = await carritoModel.find({})
console.log(ra_carrito)

/* Update */

console.log('Update...')
let u_carrito = await carritoModel.updateOne({usuario: 'Hector', producto: 'Xbox Series S'})
console.log(u_carrito)

/* Read */
console.log('Reading...')
let r_producto = await carritoModel.find({usuario: "Marco"})
console.log(r_producto)

/* Delete */
console.log('Deleting user...')
let d_carrito = await carritoModel.deleteOne({usuario: 'Juan'})
console.log(d_carrito)

await mongoose.disconnect();