$(document).ready(function() {
    const numAlumnos = 12;
    const numParciales = 3;
    
    let calificaciones = [
        [5.5, 8.6, 10],
        [8.0, 5.5, 10],
        [9.0, 4.1, 7.8],
        [10, 2.2, 8.1],
        [7.0, 9.2, 7.1],
        [9.0, 4.0, 6.0],
        [6.5, 5.0, 5.0],
        [4.0, 7.0, 4.0],
        [8.0, 8.0, 9.0],
        [10, 9.0, 9.2],
        [5.0, 10, 8.4],
        [9.0, 4.6, 7.5]
    ];

    function generarTabla() {
        let tablaHTML = '<thead><tr><th>Alumno\\Parcial</th>';
        for (let i = 1; i <= numParciales; i++) {
            tablaHTML += `<th>Parcial ${i}</th>`;
        }
        tablaHTML += '</tr></thead><tbody>';

        calificaciones.forEach((fila, i) => {
            tablaHTML += `<tr><th>Alumno ${i + 1}</th>`;
            fila.forEach((calificacion, j) => {
                tablaHTML += `<td><input type="number" class="calif-input" id="calif-${i}-${j}" value="${calificacion}" min="0" max="10" step="0.1"></td>`;
            });
            tablaHTML += '</tr>';
        });

        tablaHTML += '</tbody>';
        $('#tablaCalificaciones').html(tablaHTML);
    }

    function validarEntradas() {
        let esValido = true;
        $('.calif-input').each(function() {
            let valor = parseFloat($(this).val());
            if (isNaN(valor) || valor < 0 || valor > 10) {
                esValido = false;
                $(this).addClass('border-danger');
            } else {
                $(this).removeClass('border-danger');
            }
        });
        return esValido;
    }

    function obtenerPromedio(fila) {
        const suma = fila.reduce((a, b) => a + b, 0);
        return parseFloat((suma / numParciales).toFixed(1));
    }

    function calcularPromedios() {
        let promedios = [];
        let reprobados = 0;

        calificaciones.forEach(fila => {
            const promedio = obtenerPromedio(fila);
            promedios.push(promedio);
            
            fila.forEach(calificacion => {
                if (calificacion < 7.0) {
                    reprobados++;
                }
            });
        });

        const promedioMasAlto = Math.max(...promedios);
        const promedioMasBajo = Math.min(...promedios);

        const distribucion = {
            '0.0 - 5.9': 0,
            '6.0 - 6.9': 0,
            '7.0 - 7.9': 0,
            '8.0 - 8.9': 0,
            '9.0 - 10.0': 0
        };

        promedios.forEach(prom => {
            if (prom < 6.0) distribucion['0.0 - 5.9']++;
            else if (prom < 7.0) distribucion['6.0 - 6.9']++;
            else if (prom < 8.0) distribucion['7.0 - 7.9']++;
            else if (prom < 9.0) distribucion['8.0 - 8.9']++;
            else distribucion['9.0 - 10.0']++;
        });

        return { promedios, promedioMasAlto, promedioMasBajo, reprobados, distribucion };
    }

    function mostrarResultados(resultados) {
        $('#promedioMasAlto').text(`El promedio más alto es: ${resultados.promedioMasAlto}`);
        $('#promedioMasBajo').text(`El promedio más bajo es: ${resultados.promedioMasBajo}`);
        $('#totalReprobados').text(`Total de parciales reprobados: ${resultados.reprobados}`);

        let distribucionTexto = 'Distribución de Promedios: ';
        for (let rango in resultados.distribucion) {
            distribucionTexto += `${rango}: ${resultados.distribucion[rango]} alumnos. `;
        }
        $('#distribucionFinal').text(distribucionTexto);
    }

    function actualizarCalificaciones() {
        for (let i = 0; i < calificaciones.length; i++) {
            for (let j = 0; j < calificaciones[i].length; j++) {
                calificaciones[i][j] = parseFloat($(`#calif-${i}-${j}`).val());
            }
        }
    }

    $('#calcularCalificaciones').click(function() {
        if (validarEntradas()) {
            actualizarCalificaciones();
            const resultados = calcularPromedios();
            mostrarResultados(resultados);
        } else {
            alert('Por favor, corrige las calificaciones incorrectas (deben ser entre 0 y 10).');
        }
    });

    generarTabla();
});
