$(document).ready(function() {
    const filas = 5;
    const columnas = 10;
    
    function crearMatriz() {
        let matrizHTML = '';
        for (let i = 0; i < filas; i++) {
            matrizHTML += '<tr>';
            for (let j = 0; j < columnas; j++) {
                matrizHTML += `<td><input type="number" class="matriz-input" id="celda-${i}-${j}" min="-100" max="100" value="0"></td>`;
            }
            matrizHTML += `<td><input type="text" id="sumaFila-${i}" disabled></td><td><input type="text" id="promFila-${i}" disabled></td>`;
            matrizHTML += '</tr>';
        }

        matrizHTML += '<tr>';
        for (let j = 0; j < columnas; j++) {
            matrizHTML += `<td><input type="text" id="sumaColumna-${j}" disabled></td>`;
        }
        matrizHTML += '</tr>';

        matrizHTML += '<tr>';
        for (let j = 0; j < columnas; j++) {
            matrizHTML += `<td><input type="text" id="promColumna-${j}" disabled></td>`;
        }
        matrizHTML += '</tr>';

        $('#matriz').html(matrizHTML);
    }

    function generarNumerosAleatorios() {
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                const randomNum = Math.floor(Math.random() * 201) - 100;
                $(`#celda-${i}-${j}`).val(randomNum);
            }
        }
        calcularResultados();
    }

    function sumaRecursiva(arr, index = 0) {
        if (index === arr.length) return 0;
        return arr[index] + sumaRecursiva(arr, index + 1);
    }

    function calcularResultados() {
        for (let i = 0; i < filas; i++) {
            let fila = [];
            for (let j = 0; j < columnas; j++) {
                fila.push(parseInt($(`#celda-${i}-${j}`).val()));
            }
            let sumaFila = sumaRecursiva(fila);
            let promedioFila = Math.floor(sumaFila / columnas);
            $(`#sumaFila-${i}`).val(sumaFila);
            $(`#promFila-${i}`).val(promedioFila);
        }

        for (let j = 0; j < columnas; j++) {
            let columna = [];
            for (let i = 0; i < filas; i++) {
                columna.push(parseInt($(`#celda-${i}-${j}`).val()));
            }
            let sumaColumna = sumaRecursiva(columna);
            let promedioColumna = Math.floor(sumaColumna / filas);
            $(`#sumaColumna-${j}`).val(sumaColumna);
            $(`#promColumna-${j}`).val(promedioColumna);
        }
    }

    $('#generarMatriz').on('click', generarNumerosAleatorios);
    $(document).on('input', '.matriz-input', calcularResultados);

    crearMatriz();
});
