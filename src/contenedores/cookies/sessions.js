import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

let fileStore = sessionFileStore(session);

const app = express();
app.use(cookieParser());
app.use(session({
    store: new fileStore({path: `./sesiones`, ttl:300, restries: 0}),
    secret: `Coderhouse`,
    resave: false,
    saveUninitialized: false, 
}));

app.get(`/`, (req, res) => {
    res.send(`Servidor Express OK`);
});

let contador = 0;

app.get(`/sin-session`, (req, res) => {
    res.send({contador: ++contador})
});

app.get(`/con-session`, (req, res) =>{
    if(req.session.contador){
        req.session.contador++;
        res.send(`Hola! visitaste la pagina ${req.session.contador} `)
    }else{
        req.session.contador = 1;
        res.send(`Hola ${getNombreSession(req)}! Te damos la bienvenida`);
    }
});

app.get(`/logout`, (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.json({error: 'olvidar', body: err})
        } else {
            res.send(`Hasta luego...`)
        }
    })
});

app.get(`/info`, (req, res) =>{
    console.log(`----- req.session -----\n`);
    console.log(req.session);
    console.log(`----------\n`);

    console.log(`----- req.sessionID -----\n`);
    console.log(req.sessionID);
    console.log(`-----------\n`)

    console.log(`----- req.Cookies -----\n`);
    console.log(req.cookies);
    console.log(`-----------\n`);

    console.log(`----- req.sessionStore ----- \n`)
    console.log(req.sessionStore);
    console.log(`-----------\n`);

    res.send(`Info de la consola`)
});

app.get(`/info-web`, (req, res) => {
    res.send({ session: req.session,
                sessionID: req.sessionID,
                cookies: req.cookies,
                /*sessionStore: req.sessionStore*/ /*SessionStore no funciona*/});
})

const PORT = 8000;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});

console.log(`error`, error => console.log(`Error del servidor ${error}`));

/*import express from 'express';
import session from 'express-session';

const app = express();
app.use(session({
    secret: 'Coderhouse',
    resave: false,
    saveUninitialized: false,
}));

const getNombreSession = req => req.query.nombre ? req.session.nombre = req.query.nombre : 'Invitado';

app.get('/', (req,res) => {
    if(req.session.contador){
        req.session.contador++;
        res.send(`Hola ${getNombreSession(req)}! visitaste la pagina ${req.session.contador} veces`);
    }else{
        req.session.contador = 1;
        res.send(`Hola ${getNombreSession(req)}! Le damos la bienvenida`);
    }
});

app.get('/olvidar', (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.json({error: 'olvidar', body: err})
        }else{
            res.send(`See you soon!`)
        }
    })
});

const PORT = 8000
const server = app.listen(PORT, () => {
    console.log(`Server Listen http://localhost:${PORT}`)
})
server.on(`error`, error => console.log(`Error server ${error}`));*/