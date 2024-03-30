/* Instanciamos variables para Express */
const express = require('express');

/* 
Funcion que realiza la logica para la simulacion de un prestamo
Ruta y parametros: http://localhost:8080/prestaya/simulador?valorprestamo=10&tasainteres=10&plazoprestamo=10 
*/

exports.simuladorPrestamos = function(req, res){
    
    let valorCuotaMensual=[];
    let abonoCapital=[];
    let valorInteres=[];
    let valorSaldo=[];

    let paramValorPrestamo=0;
    let paramTasaInteres=0;
    let paramPlazoPrestamo=0;
 
    let jsonObjetoResulatadoSimulacion = {};

    paramValorPrestamo = req.query.valorprestamo;
    paramTasaInteres   = req.query.tasainteres;
    paramPlazoPrestamo = req.query.plazoprestamo;

    paramTasaInteres      = paramTasaInteres / 100;
    valorCuotaMensual[0]  = paramValorPrestamo * paramTasaInteres * ((1 + paramTasaInteres) ** paramPlazoPrestamo) / 
                            (((1 + paramTasaInteres) ** paramPlazoPrestamo) - 1);
    valorInteres[0]       = paramValorPrestamo * paramTasaInteres;
    abonoCapital[0]       = valorCuotaMensual - valorInteres;
    valorSaldo [0]        = paramValorPrestamo - abonoCapital;

    for(i = 1; i < paramPlazoPrestamo; i++){
        valorCuotaMensual[i] = valorCuotaMensual[0];
        valorInteres[i]      = valorSaldo[i-1] * paramTasaInteres;
        abonoCapital[i]      = valorCuotaMensual[i] - valorInteres[i];
        valorSaldo[i]        = valorSaldo[i-1] - abonoCapital[i];
    }

    for(i = 0; i < paramPlazoPrestamo; i++){
        jsonObjetoResulatadoSimulacion[`mes ${i+1}`]={
            "Valor cuota mensual =": colPesos(valorCuotaMensual[i]),
            "Valor intereses ="    : colPesos(valorInteres[i]),
            "Abono a capital ="    : colPesos(abonoCapital[i]),
            "Valor saldo ="        : colPesos(valorSaldo[i])
        }; 
    }    
    return res.status(200).json(jsonObjetoResulatadoSimulacion);
};

function colPesos(value) {
    let valorNumero = Intl.NumberFormat('es-CO', { 
                                                  style: 'decimal', 
                                                  maximumFractionDigits: 2,
                                                 }
                                       ).format(value,)
    return valorNumero;
  }