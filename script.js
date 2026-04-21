let data = {
    persona: {},
    familiares: [],
    condiciones: [],
    internamientos: []
};



// Navegación
function nextPage(num) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + num).classList.add('active');

    if (num === 2) {
        data.persona = {
            nombre: document.getElementById('nombre').value,
            edad: document.getElementById('edad').value
        };
    }

    actualizarBarra(num);
}

// ================== FAMILIARES ==================
function agregarFamiliar() {
    let familiar = {
        nombre: document.getElementById('famNombre').value,
        parentesco: document.getElementById('parentesco').value,
        edad: document.getElementById('famEdad').value
    };

    data.familiares.push(familiar);
    renderListas();
}

function editarFamiliar(index) {
    let f = data.familiares[index];

    document.getElementById('famNombre').value = f.nombre;
    document.getElementById('parentesco').value = f.parentesco;
    document.getElementById('famEdad').value = f.edad;

    data.familiares.splice(index, 1);
    renderListas();
}

// ================== CONDICIONES ==================
function agregarCondicion() {
    let condicion = {
        enfermedad: document.getElementById('enfermedad').value,
        tiempo: document.getElementById('tiempo').value
    };

    data.condiciones.push(condicion);
    renderListas();
}

function editarCondicion(index) {
    let c = data.condiciones[index];

    document.getElementById('enfermedad').value = c.enfermedad;
    document.getElementById('tiempo').value = c.tiempo;

    data.condiciones.splice(index, 1);
    renderListas();
}

// ================== INTERNAMIENTOS ==================
function agregarInternamiento() {
    let inter = {
        fecha: document.getElementById('fecha').value,
        centro: document.getElementById('centro').value,
        diagnostico: document.getElementById('diagnostico').value
    };

    data.internamientos.push(inter);
    renderListas();
}

function editarInternamiento(index) {
    let i = data.internamientos[index];

    document.getElementById('fecha').value = i.fecha;
    document.getElementById('centro').value = i.centro;
    document.getElementById('diagnostico').value = i.diagnostico;

    data.internamientos.splice(index, 1);
    renderListas();
}

// ================== RENDER LISTAS ==================
function renderListas() {
    document.getElementById('listaFamiliares').innerHTML = "";
    document.getElementById('listaCondiciones').innerHTML = "";
    document.getElementById('listaInternamientos').innerHTML = "";

    data.familiares.forEach((f, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${f.nombre} - ${f.parentesco} - ${f.edad}
        <button onclick="editarFamiliar(${index})">Editar</button>`;
        document.getElementById('listaFamiliares').appendChild(li);
    });

    data.condiciones.forEach((c, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${c.enfermedad} - ${c.tiempo}
        <button onclick="editarCondicion(${index})">Editar</button>`;
        document.getElementById('listaCondiciones').appendChild(li);
    });

    data.internamientos.forEach((i, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${i.fecha} - ${i.centro} - ${i.diagnostico}
        <button onclick="editarInternamiento(${index})">Editar</button>`;
        document.getElementById('listaInternamientos').appendChild(li);
    });
}

// ================== MOSTRAR ==================
function mostrarDatos() {
    document.getElementById('resultado').textContent = JSON.stringify(data, null, 2);
}

// ================== LOCAL STORAGE ==================
function guardarDatos() {
    localStorage.setItem("formularioData", JSON.stringify(data));
    alert("Datos guardados correctamente");
}

function cargarDatos() {
    let datosGuardados = localStorage.getItem("formularioData");

    if (datosGuardados) {
        data = JSON.parse(datosGuardados);
        renderListas();
        alert("Datos cargados");
    } else {
        alert("No hay datos guardados");
    }
}

// Cargar automáticamente


function reiniciarFormulario() {
    if (confirm("¿Seguro que deseas reiniciar el formulario?")) {
        location.reload();
    }
}

function prevPage(num) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + num).classList.add('active');
    actualizarBarra(num);
}

function actualizarBarra(pagina) {
    let progreso = (pagina - 1) * 25;
    document.getElementById("progress").style.width = progreso + "%";
}

