import admin from "firebase-admin";
import service_account from './desafio-44973-firebase-adminsdk-q0dyv-fc9acb4991.js'
import serviceAccount from "path/to/serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
console.log('Firebase database Connected...')

CRUD()

async function CRUD() {
    const db = admin.firestore();
    const query = db.collection('carritos')

    /*Create*/ 
    try{
        /*const doc = query.doc() // para la generación autamtizada de la id */
        let id = 1
        let doc = query.doc(`${id}`) /*Genera de forma manual la id*/
        await doc.create({nombre: 'Andres', dni: 123456789})
        id++
        doc = query.doc(`${id}`) /*Genera de forma manual la id*/
        await doc.create({nombre: 'Manuel', dni: 125673434})
        id++
        doc = query.doc(`${id}`) /*Genera de forma manual id*/
        await doc.create({nombre: 'Juan', dni: 75727890942})

        console.log('Datos Insertados')
    } catch (error) {console.log(error)}

    /*Read All*/
    try{
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
            dni: doc.data().dni,
        }))
        console.log(response);
    } catch (error) {console.log(error)}

    /*Read ID*/
    try{
        let id = 2
        const doc = query.doc(`${id}`)
        const item = await doc.get()
        const response = item.data()
        console.log(response);
    }catch (error) {console.log(error)}

    /*Update*/
    try{
        let id = 2
        const doc = query.doc(`${id}`);
        let item = await doc.update({ dni: 52356346721});
        console.log("El usuario a sido actualizado", item);
    }catch (error) {console.log(error)}

    /*Delete*/ 
    try{
        let id = 1
        const doc = query.doc(`${id}`);
        const item = await doc.delete()
        console.log("El usuario a sido borrado de forma exitosa", item);
    }catch (error) {console.log(error)}
}