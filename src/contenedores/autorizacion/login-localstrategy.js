const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const { Strategy, LocalStrategy } = require('passport-local');

//Persistencias//
const usuarios = [];
const app = express();

//Auth
const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    }else{
        res.redirect('/login')
    }
}


//Passport
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, (req, nombre, password, done) => {
    const { direccion } = req.body
    const usuario = usuarios.find(u => u.nombre === nombre)
    if (usuario) {
        return done('Usuario ya registrado')
}

const user = {
    username,
    nombre,
    direccion,
}
usuarios.push(user)
return done(null, user)
}));

passport.use('login', new LocalStrategy((nombre, password, done) => {
    const user = usuarios.find(u => u.nombre === nombre)
    if (!user) {
        return done(null, false)
    }

    if (user.password !== password) {
        return done(null, false)
    }
    user.contador = 0;
    return done(null, user)
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    const user = usuarios.find(u => u.username === username)
    done(null, user);
});

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

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))

app.get('/failregister', (req, res) => {
    res.render('register-error')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/datos' }));

app.get('/faillogin', (req, res) => {
    res.render('login-error')
})

app.get('/datos', isAuth, (req, res) => {
    if(!req.user.contador) {
        req.user.contador = 0;
    }

    req.user.contador++;
    res.render('datos', {
        datos: usuarios.find(u => u.username === req.user.username),
        contador: req.user.contador
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/', isAuth, (req, res) => {
    res.redirect('/datos');
});

const port = 8080;
const server = app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));

server.on('error', error => console.log(`Error en servidor ${error}`));