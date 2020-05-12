var express = require('express');

app = express();

// Rutas 
app.get('/', (rec, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});


module.exports = app;