const express = require('express');
const app = express();
const port = 5500;

app.get('/',(request, response) =>{
    response.send('Hello World!')
})

app.listen(port,() =>{
    console.log(`Estas usando el puerto: ${port}`)
})