/* Instanciamos variables para Express */
const express = require('express');
var router = express.Router();

/* Instanciamos rutas para la logica de negocio */ 
const simuladorPrestamosController = require('../controllers/simuladorPrestamosControllers');

/* Definimos las rutas http */
router.get('/prestaya/simulador', simuladorPrestamosController.simuladorPrestamos); 

module.exports = router;