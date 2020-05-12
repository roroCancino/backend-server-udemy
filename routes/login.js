var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
app = express();

var Usuario = require('../models/usuario');


app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario.',
                errors: err
            });
        }
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas.',
                errors: { message: 'Credenciales incorrectas.' }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas.',
                errors: { message: 'Credenciales incorrectas.' }
            });
        }
        usuarioBD.password = ';)';
        //crear token
        var token = jwt.sign({ usuario: usuarioBD }, SEED, { expiresIn: 14400 });
        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token: token,
            body: body
        });

    });

});

module.exports = app;