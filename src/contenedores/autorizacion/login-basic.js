const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

//Persistencias//
const usuarios = [];
const app = express();

//Middleware//
app.use(session({
    secret: "flower935",
    resave: false,
    saveUninitialized: false,
    cookies:{
        maxAge: 6000
    }
}))

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', '.hbs');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//rutas

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
});

app.post('/register', (req, res) => {
    const { nombre, password, direccion } = req.body;
    const usuario = usuarios.find(u => u.nombre === nombre && u.password === password && u.direccion === direccion);

    if (usuario) {
        return res.render('register-error');
    }

    usuarios.push({ nombre, password, direccion })
    res.redirect('/login')

});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.post('/login', (req, res) => {
    const { nombre, password } = req.body;
    const usuario = usuarios.find(u => u.nombre === nombre && u.password === password);
    if (!usuario) {
        return res.render('login-error');
    }

    req.session.nombre = nombre;
    req.session.contador = 0;
    res.redirect('/datos')
});

app.get('/datos', (req, res) => {
    if(req.session.nombre) {
    req.session.contador++;
    res.render('datos', {
        datos: usuarios.find(u => u.nombre === req.session.nombre), 
        contador: req.session.contador
    });
    } else {
        return res.redirect('/login')
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/login');
    });
});

app.get('/', (req, res) => {
    if(req.session.nombre) {
        res.redirect('/datos')
    } else {
        res.redirect('/login')
    }
})

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Servidor Listening on port http://localhost:${PORT}`));
server.on(`error`, error => console.log(`Error en servidor ${error}`))