// Requieres 
var express = require('express');
var mongoose = require('mongoose');

// inicualizar variables
var app = express();

// Rutas 
app.get('/', (rec, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) { throw err; }
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Node/Express: \x1b[32m%s\x1b[0m', 'online');

});