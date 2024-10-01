const express = require('express');
const

app = express();

app.post('/', async (req, res) => {
    try {
        const nuevoCliente = await cliente.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (e) {
        console.log('Error: ' + e)
        response.status(500).json({error: 'ERROR AL CREAR CLIENTE'});
    }
});