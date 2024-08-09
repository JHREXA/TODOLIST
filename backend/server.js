const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./configs/config');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://herex-devfullstack:PaAog7EYSTy8HJL5@cluster0.sghhwnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const app = express();
const api = express.Router();
const auth = express.Router();
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
};

MongoClient.connect(uri, {})
    .then(client => {
        console.log('Conectado a MongoDB');
        const db = client.db('todolist');
        const mtareas = db.collection('tareas');
        let musers = db.collection('usuarios');

        app.use(cors(corsOptions));
        app.use(bodyParser.json());

        // API endpoints for tasks
        api.get('/tareas', cors(corsOptions), (_req, res) => {
            mtareas.find({}).toArray((err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error al recuperar tareas" });
                }
                res.json(result);
            });
        });

        api.get('/tareas/:username', cors(corsOptions), (req, res) => {
            const username = req.params.username;
            mtareas.find({ usuario: username }).toArray((err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error al recuperar tareas" });
                }
                res.json(result);
            });
        });

        api.post('/tarea', cors(corsOptions), (req, res) => {
            mtareas.insertOne(req.body)
                .then(_result => {
                    res.json(req.body);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: "Error al crear tarea" });
                });
        });

        // Authentication endpoints
        auth.use(cors());

        auth.post('/login', cors(corsOptions), getUsers, (req, res) => {
            const user = musers.find(user => user.email === req.body.email);
            if (!user) {
                return sendErrorAuth(res);
            }

            if (user.password === req.body.password) {
                sendToken(user, res);
            } else {
                sendErrorAuth(res);
            }
        });

        auth.post('/register', cors(corsOptions), getUsers, (req, res) => {
            const existingUser = musers.find(user => user.email === req.body.email);
            if (existingUser) {
                return res.status(400).json({ message: "Usuario ya registrado" });
            }

            const newUser = {
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password // Note: In production, hash this password before storing!
            };

            musers.insertOne(newUser)
                .then(_result => {
                    sendToken(newUser, res);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: "Error al registrar usuario" });
                });
        });

        function getUsers(_req, res, next) {
            musers.find({}).toArray((err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error al obtener usuarios" });
                }
                musers = result;
                next();
            });
        }

        function sendToken(user, res) {
            const token = jwt.sign({ userId: user._id }, config.llave, { expiresIn: '1h' });
            res.json({ nombre: user.nombre, token });
        }

        function sendErrorAuth(res) {
            return res.status(401).json({ success: false, message: 'Email o password incorrecto' });
        }

        function checkAuth(req, res, next) {
            if (!req.header('Authorization')) {
                return res.status(401).send({ message: 'No tienes autorización' });
            }
            const token = req.header('Authorization').split(' ')[1];
            try {
                const decoded = jwt.verify(token, config.llave);
                req.user = decoded;
                next();
            } catch (err) {
                return res.status(401).send({ message: 'El token no es válido' });
            }
        }

        // Server setup
        app.use('/api', api);
        app.use('/auth', auth);
        app.listen(7070, () => {
            console.log('Servidor en ejecución en el puerto 7070');
        });
    })
    .catch(err => {
        console.error('Error al conectar con MongoDB', err);
    });
