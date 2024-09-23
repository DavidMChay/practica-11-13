$(document).ready(function() {
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    let ventas = [
        [5, 16, 10, 12, 24],
        [40, 55, 10, 11, 18],
        [15, 41, 78, 14, 51],
        [35, 22, 81, 15, 12],
        [50, 12, 71, 10, 20],
        [70, 40, 60, 28, 22],
        [50, 50, 50, 36, 25],
        [40, 70, 40, 11, 20],
        [20, 20, 30, 12, 18],
        [10, 40, 32, 13, 16],
        [50, 3, 24, 15, 82],
        [40, 46, 15, 46, 22]
    ];

    function generarTabla() {
        let tablaHTML = '<thead><tr><th>Mes\\Día</th>';
        diasSemana.forEach(dia => {
            tablaHTML += `<th>${dia}</th>`;
        });
        tablaHTML += '</tr></thead><tbody>';
        
        ventas.forEach((fila, i) => {
            tablaHTML += `<tr><th>Mes ${i + 1}</th>`;
            fila.forEach((venta, j) => {
                tablaHTML += `<td><input type="number" class="venta-input" id="venta-${i}-${j}" value="${venta}" min="0"></td>`;
            });
            tablaHTML += '</tr>';
        });
        tablaHTML += '</tbody>';
        $('#tablaVentas').html(tablaHTML);
    }

    function encontrarVenta(ventas, criterio) {
        let valor = criterio === 'min' ? Number.MAX_VALUE : Number.MIN_VALUE;
        let dia = 0;
        let mes = 0;

        for (let i = 0; i < ventas.length; i++) {
            for (let j = 0; j < ventas[i].length; j++) {
                if (criterio === 'min' && ventas[i][j] < valor) {
                    valor = ventas[i][j];
                    mes = i;
                    dia = j;
                }
                if (criterio === 'max' && ventas[i][j] > valor) {
                    valor = ventas[i][j];
                    mes = i;
                    dia = j;
                }
            }
        }
        return { valor, mes: mes + 1, dia: diasSemana[dia] };
    }

    function calcularVentaTotal(ventas) {
        let total = 0;
        ventas.forEach(fila => {
            total += fila.reduce((a, b) => a + b, 0);
        });
        return total;
    }

    function calcularVentaPorDia(ventas) {
        let ventaPorDia = new Array(ventas[0].length).fill(0);
        for (let i = 0; i < ventas.length; i++) {
            for (let j = 0; j < ventas[i].length; j++) {
                ventaPorDia[j] += ventas[i][j];
            }
        }
        return ventaPorDia;
    }

    function actualizarVentas() {
        for (let i = 0; i < ventas.length; i++) {
            for (let j = 0; j < ventas[i].length; j++) {
                ventas[i][j] = parseInt($(`#venta-${i}-${j}`).val());
            }
        }
    }

    $('#calcularVentas').click(function() {
        actualizarVentas();
        const ventaMinima = encontrarVenta(ventas, 'min');
        const ventaMaxima = encontrarVenta(ventas, 'max');
        const ventaTotal = calcularVentaTotal(ventas);
        const ventasPorDia = calcularVentaPorDia(ventas);

        $('#ventaMinima').text(`La menor venta fue de $${ventaMinima.valor}, en el mes ${ventaMinima.mes}, día ${ventaMinima.dia}.`);
        $('#ventaMaxima').text(`La mayor venta fue de $${ventaMaxima.valor}, en el mes ${ventaMaxima.mes}, día ${ventaMaxima.dia}.`);
        $('#ventaTotal').text(`La venta total es de $${ventaTotal}.`);
        let ventasDiaTexto = 'Ventas por día de la semana: ';
        ventasPorDia.forEach((venta, index) => {
            ventasDiaTexto += `${diasSemana[index]}: $${venta}, `;
        });
        $('#ventaPorDia').text(ventasDiaTexto.slice(0, -2) + '.');
    });

    generarTabla();
});
