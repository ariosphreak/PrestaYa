function simularPrestamo() {
    var valorPrestamo = document.getElementById("valorPrestamo").value;
    var tasaInteres = document.getElementById("tasaInteres").value;
    var plazoPrestamo = document.getElementById("plazoPrestamo").value;
    
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/prestaya/simulador?valorprestamo=" + valorPrestamo + "&tasainteres=" + tasaInteres + "&plazoprestamo=" + plazoPrestamo;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = JSON.parse(xhr.responseText);
            mostrarResultado(respuesta);
        }
    };
    
    xhr.open("GET", url, true);
    xhr.send();
}

function mostrarResultado(respuesta) {
    var tabla = "<table border='1'><tr><th>Mes</th><th>Valor cuota mensual</th><th>Valor intereses</th><th>Abono a capital</th><th>Valor saldo</th></tr>";
    for (var mes in respuesta) {
        tabla += "<tr><td>" + mes + "</td>";
        tabla += "<td>" + respuesta[mes]["Valor cuota mensual ="] + "</td>";
        tabla += "<td>" + respuesta[mes]["Valor intereses ="] + "</td>";
        tabla += "<td>" + respuesta[mes]["Abono a capital ="] + "</td>";
        tabla += "<td>" + respuesta[mes]["Valor saldo ="] + "</td></tr>";
    }
    tabla += "</table>";
    document.getElementById("resultado").innerHTML = tabla;
}