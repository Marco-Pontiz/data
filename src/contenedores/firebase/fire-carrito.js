/*Base de datos de FireBase*/
import admin from "firebase-admin";
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./db/Key.json', 'utf8'));

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:'http://desafio-44973.firebaseio.com'
})

console.log('La base de datos de Firebase, está en funcionamiento')

const db = admin.firestore();
const carrito = db.collection('carrito')


/*Create*/
try{
    let min = 1000
    let max = 9999
    let co_de = (Math.random() * (max - min) + min)
    await carrito.doc().set({nombre: "Pedro", codigo: `${co_de}`, producto: "Sony Play Station 5"});
    await carrito.doc().set({nombre: "Juan", codigo: `${co_de}`, producto: "Xbox Series S"});
    await carrito.doc().set({nombre: "Stefano", codigo: `${co_de}`, producto: "Nvidia GTX 3090"});
    await carrito.doc().set({nombre: "Cantina", codigo: `${co_de}`, product: "Sega Genesis"});
    console.log("Funciona!")
} catch(error) {console.log(error)}


/*Read All*/
const snapshot = await carrito.get();
console.log('Leyendo...')
snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data())
});

/*Update*/
const item = await carrito.doc('4HrJ0vpH1OUXXbojtxit').update({nombre: 'Lucas'})
console.log('Updated...', item)

/*Delete*/
const Todelete = await carrito.doc('fIwSgqNEwyekg16xHmOe').delete();
console.log('El usuario del carrito se borró con éxito!', Todelete)
