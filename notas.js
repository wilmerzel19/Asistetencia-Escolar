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

    // Validar que las notas estén en el rango correcto
    if (not1 < 0 || not1 > 100 || not2 < 0 || not2 > 100 || not3 < 0 || not3 > 100 || not4 < 0 || not4 > 100) {
        swal("Error", "Las notas deben estar entre 0 y 100", "error");
        return false;
    }

    // Calcula el promedio
    let prom = (not1 + not2 + not3 + not4) / 4;

    // Establece la observación
    let obs = (prom >= 60) ? "!Aprobado¡ &#x2714" : "!Reprobado¡ &#x274c";

    // Agrega los datos a la tabla
    const tabla = document.getElementById('addtabla');
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${nom}</td><td>${not1}</td><td>${not2}</td><td>${not3}</td><td>${not4}</td><td>${prom.toFixed()}</td><td>${obs}</td><td><button class="btn btn-sm btn-warning" onclick="editarNota(this)">Editar</button></td><td><button class="btn btn-sm btn-danger" onclick="eliminarNota(this)">Eliminar</button></td>`;
    // Agrega la clase CSS 'reprobado' si el alumno está reprobado
    if (obs === "Reprobado") {
        fila.classList.add('reprobado');
    }
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
        fila.innerHTML = `<td>${nota.nombre}</td><td>${nota.nota1}</td><td>${nota.nota2}</td><td>${nota.nota3}</td><td>${nota.nota4}</td><td>${nota.promedio}</td><td>${nota.observacion}</td><td><button class="btn btn-sm btn-warning" onclick="editarNota(this)">Editar</button></td><td><button class="btn btn-sm btn-danger" onclick="eliminarNota(this)">Eliminar</button></td>`;
        tabla.appendChild(fila);
    });
}

      function editarNota(btn) {
        let fila = btn.parentNode.parentNode;
        let campos = fila.querySelectorAll('td');
    
        document.getElementById('nombre').value = campos[0].textContent;
        document.getElementById('nota1').value = campos[1].textContent;
        document.getElementById('nota2').value = campos[2].textContent;
        document.getElementById('nota3').value = campos[3].textContent;
        document.getElementById('nota4').value = campos[4].textContent;
    
        fila.remove();
        actualizarLocalStorage();
    }
    
    // Función para eliminar una nota
    function eliminarNota(btn) {
        if (confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
            let fila = btn.parentNode.parentNode;
            fila.remove();
            actualizarLocalStorage();
        }
    }
    
    // Función para actualizar el almacenamiento local después de editar o eliminar una nota
    function actualizarLocalStorage() {
        let notasGuardadas = [];
        let filas = document.querySelectorAll('#addtabla tr');
    
        filas.forEach(fila => {
            let campos = fila.querySelectorAll('td');
            notasGuardadas.push({
                nombre: campos[0].textContent,
                nota1: parseFloat(campos[1].textContent),
                nota2: parseFloat(campos[2].textContent),
                nota3: parseFloat(campos[3].textContent),
                nota4: parseFloat(campos[4].textContent),
                promedio: parseFloat(campos[5].textContent),
                observacion: campos[6].textContent
            });
        });
    
        localStorage.setItem('notas', JSON.stringify(notasGuardadas));
    }



