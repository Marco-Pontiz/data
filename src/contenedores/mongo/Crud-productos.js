import mongoose from 'mongoose';


await mongoose.connect('mongodb://localhost:27017/Desafio'),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}
console.log('Database MongoDB Connected')


const productosCollection = 'Productos';

const productosSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max: 100},
    codigo: {type: String, require: true, max: 99999},
    precio: {type: Number, require:true}
})

export const productoModel = mongoose.model(productosCollection, productosSchema)

/* Create Product */

console.log('Creating Products...')

const productos = [
    {
        nombre: 'Sony Play Station 5',
        codigo: '31j5s70a9sx',
        precio: 250000
    },
    {
        nombre: 'Microsoft Xbox Series S',
        codigo: 'ax48l1wa6g0',
        precio: 200000
    },
    {
        nombre: 'Nintendo Switch',
        codigo: '666ask3ldcx',
        precio: 700000
    },
    {
        nombre: 'Nvidia GTX 3090',
        codigo: '14jd74rf90as',
        precio: 350000 
    }
]

const inserciones = [];

for (const producto of productos) {
    inserciones.push(productoModel.create(producto))
}

const results = await Promise.all(inserciones)
const rejected = results.filter(results => results.status === "rejected")

if(rejected.length > 0){
    console.log('Error al insertar productos')
    console.log(rejected)
} else {
    console.log('Lo que se agregó al DB')
    console.log(inserciones)
    console.log('Productos fueros insertados')
}

/* Read All */

console.log('Reading All...')
const ra_producto = await productoModel.find({})
console.log(ra_producto)

/* Update */

console.log('Update...')
let u_producto = await productoModel.updateOne({nombre: 'Sony Play Station 4', codigo: '1f4gsi47c9a0', precio: 100000 })
console.log(u_producto)

/* Read */
console.log('Reading...')
let r_producto = await productoModel.find({nombre: 'Sony Play Station 5'})
console.log(r_producto)

/* Delete */
console.log('Delete...')
let d_producto = await productoModel.deleteOne({nombre: 'Nintendo Switch'})
console.log(d_producto)

await mongoose.disconnect();
