/* Clase 24
import express from 'express';
import cookieParser from 'cookieParser';
import session from 'express-session';

const fileStore = require(`session-file-store`)(session);

const app = express();
app.use(cookieParser());
app.use(session({
    store: new fileStore({path: `./sesiones`, ttl:300, retries: 0}),
    secret: ``
}))
*/

/*Clase 23*/
import express, {json} from 'express';
import cookieParser from 'cookie-parser';

const app = express()
app.use(cookieParser('Coderhouse'))
app.use(express.json())

app.get('/cookies', (req, res) => {
    res.json({ normales: req.cookies, firmadas: req.signedCookies })
});

app.post(`/cookies`, (req, res) => {
    const {nombre, valor, tiempo} = req.body;
    console.log(nombre, valor, tiempo); 
    if(!nombre || !valor){
        res.status(404).json({error: `Missing Data`})
    }
    if(tiempo){
        res.cookie(nombre, valor, { signed: true, maxAge: tiempo})
    } else {
        res.cookie(nombre, valor, {signed : true})
    }
    res.json({proceso: `Ok`})
});

app.delete(`/cookies/:nombre`, (req, res) => {
    const {nombre} = req.params;

    if(nombre){
        res.clearCookie(nombre);
        res.json({proceso: `Ok`})
    } else {
        res.status(404).json({ error: `Missing Name`})
    }
})

const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Server Listen http://localhost:${PORT}`)
})
server.on(`error`, error => console.log(`Error server ${error}`));