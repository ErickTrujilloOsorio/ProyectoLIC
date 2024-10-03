const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Probamos la conexión y sincronizamos modelos
sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar los modelos:', err);
}
);

// Importamos modelos
const tipoEmpleado = require('./models/tipo_empleado');
const estado = require('./models/estado');
const credito = require('./models/credito');
const cliente = require('./models/cliente');
const empleado = require('./models/empleado');
const solicitud = require('./models/solicitud');

// Importamos rutas
const clientesRoutes = require('./routes/clientes');

// Endpoints
app.use('/clientes',  clientesRoutes);


