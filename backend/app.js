// Importaciones
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/db');

// Inicializamos la aplicación Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración del puerto
const PORT = process.env.PORT || 5000;

// Aplicar esto solo si hay cambios en los modelos
// Importamos modelos

require('./models/tipo_empleado');
require('./models/estado');
require('./models/credito');
require('./models/cliente');
require('./models/empleado');
require('./models/solicitud');


// Importamos rutas
const clientesRoutes = require('./routes/clientes');
const empleadosRoutes = require('./routes/empleados');
const solicitudesRoutes = require('./routes/solicitudes')

// Endpoints
app.use('/clientes', clientesRoutes);
app.use('/admin', empleadosRoutes);
app.use('/solicitud', solicitudesRoutes)

// Conexión a la base de datos y sincronización de modelos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida');

        // USAR SOLAMENTE SI HAY CAMBIOS EN LOS MODELOS
        return sequelize.sync({
            force: false
        });

    })
    .then(() => {
        // console.log('Modelos sincronizados con la base de datos.');
        // Iniciar el servidor después de la sincronización
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos o al sincronizar los modelos:', err);
    });

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('hola');
});
