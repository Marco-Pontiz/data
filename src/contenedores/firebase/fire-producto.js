/*Base de datos de FireBase*/
import { captureRejectionSymbol } from "events";
import admin from "firebase-admin";
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./db/Key.json', 'utf8'));

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:'http://desafio-44973.firebaseio.com'
})

console.log('La base de datos de Firebase, está en funcionamiento')

const db = admin.firestore();
const producto = db.collection('producto')

/*Create*/
try {
    await producto.doc().set({producto: "Sony Play Station 5", precio: 500000, stock: 20});
    await producto.doc().set({producto: "Xbox Series S", precio: 450000, stock: 60})
    await producto.doc().set({producto: "Nintendo Switch", precio: 800000, stock: 100})
    await producto.doc().set({producto: "Nvidia GTX 3090", precio: 450000, stock: 200})
}catch(error){console.log(error)}   

/*Read All*/
const snapshot = await producto.get();
console.log('Leyendo...')
snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data())
});

/*Update*/
const item = await producto.doc('oV1TTJexmiMr7fO5U9pn').update({producto: "Sega Genesis", precio: 25000, stock: 300});
console.log('Updated...', item)

/*Delete*/
const Todelete = await producto.doc('tp9oYmLptaWufKpTxz4s').delete();
console.log('El producto se borró!', Todelete)