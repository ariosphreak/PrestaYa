/* Instanciamos variables para Express */
var express = require('express');
const cors = require('cors');
var app = express();               

/* Establecemos las rutas */
app.use(cors());
app.use(require('./routes/simuladorPrestamosRoutes'));

/* iniciamos el servidor */
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
  console.log('Prestaya backend corriendo en puerto: ' + app.get('port'));
});
