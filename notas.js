// Esta función se ejecuta al cargar la página para cargar los datos del localStorage, si existen
window.onload = function() {
    cargarNotasGuardadas();
};

function agregarNotas(){
    let nom = document.getElementById('nombre').value;
    let not1 = parseFloat(document.getElementById('nota1').value);
    let not2 = parseFloat(document.getElementById('nota2').value);
    let not3 = parseFloat(document.getElementById('nota3').value);
    let not4 = parseFloat(document.getElementById('nota4').value);


    // Validaciones
    if (nom === "" || isNaN(not1) || isNaN(not2) || isNaN(not3) || isNaN(not4)) {
        swal("Error", "Por favor, complete todos los campos correctamente", "error");
        return false;
    }

    if (not1 > 60 || not2 > 60 || not3 > 60 || not4 > 60) {
        swal("Error", "La nota no puede ser mayor que 60", "error");
        return false;
    }

    // Calcula el promedio
    let prom = (not1 + not2 + not3 + not4) / 4;
    let obs = (prom >=12.5) ? "!Aprobado¡ &#x2714" : "!Desaprobado¡ &#x274c";

    // Agrega los datos a la tabla
    const tabla = document.getElementById('addtabla');
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${nom}</td><td>${not1}</td><td>${not2}</td><td>${not3}</td><td> ${not4}</td><td>${prom.toFixed()}</td><td>${obs}</td>`;
    tabla.appendChild(fila);

    // Guarda los datos en el localStorage
    let notasGuardadas = JSON.parse(localStorage.getItem('notas')) || [];
    notasGuardadas.push({ nombre: nom, nota1: not1, nota2: not2, nota3: not3, nota4: not4, promedio: prom.toFixed(), observacion: obs });
    localStorage.setItem('notas', JSON.stringify(notasGuardadas));

    // Limpia los campos de entrada
    document.getElementById('nombre').value = '';
    document.getElementById('nota1').value = '';
    document.getElementById('nota2').value = '';
    document.getElementById('nota3').value = '';
    document.getElementById('nota4').value = '';

}

// Función para cargar los datos del localStorage y mostrarlos en la tabla
function cargarNotasGuardadas() {
    let notasGuardadas = JSON.parse(localStorage.getItem('notas')) || [];
    const tabla = document.getElementById('addtabla');
    notasGuardadas.forEach(nota => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${nota.nombre}</td><td>${nota.nota1}</td><td>${nota.nota2}</td><td>${nota.nota3}</td><td>${nota.nota4}</td><td>${nota.promedio}</td><td>${nota.observacion}</td>`;
        tabla.appendChild(fila);
    });
}
