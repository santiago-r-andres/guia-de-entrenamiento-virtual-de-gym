const ejerciciosBrazos = ["flexiones", "tríceps", "bíceps"];
const repeticionesBrazosFacil = [5, 10, 15];
const repeticionesBrazosIntermedio = [10, 15, 20];
const repeticionesBrazosDificil = [15, 20, 25];

const ejerciciosPiernas = ["prensa", "sentadillas", "estocadas"];
const repeticionesPiernasFacil = [4, 8, 12];
const repeticionesPiernasIntermedio = [8, 12, 16];
const repeticionesPiernasDificil = [12, 16, 20];


const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];


class Alumno {
  static id = 0;

  constructor(nombre, apellido, nivel) {
    this.id = ++Alumno.id;
    (this.nombre = nombre),
    (this.apellido = apellido),
    (this.nivelEjercicio = nivel);
  }
}




// Se agrega al boton Registrarse el evento click y la función registrarAlumnos

  crearFormulario();
  crearFormularioDias();

  const botonRegistrarse = document.getElementById("botonRegistrar");
  botonRegistrarse.addEventListener("click", registrarAlumnos);

  const botonCreaRutina = document.getElementById("botonCreaRutina");
  botonCreaRutina.onclick = () => {
    let diaDeLaSemana = document.getElementById("dias").value.toLowerCase();
    let rutinaDelDia = determinarRutina(diaDeLaSemana);
    document.getElementById("rutina-del-dia").textContent =
      "La rutina del día es " + rutinaDelDia;
    if (rutinaDelDia !== "día inválido") {
      comenzarClase(rutinaDelDia);
    } else {
      document.getElementById("mensaje").textContent = "Día inválido";
    }
  }


// CREACION DE FORMULARIO para sección Registrarse
function crearFormulario() {
  const form = document.createElement("form");
  form.id = "formRegistro";

  // SE CREA labelNombre
  const labelNombre = document.createElement("label");
  labelNombre.for = "nombre";
  labelNombre.innerText = "Nombre";
  form.appendChild(labelNombre);

  // SE CREA inputNombre
  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.id = "nombre";
  form.appendChild(inputNombre);

  // br
  form.appendChild(document.createElement("br"));

  // SE CREA labelApellido
  const labelApellido = document.createElement("label");
  labelApellido.for = "apellido";
  labelApellido.innerText = "Apellido";
  form.appendChild(labelApellido);

  // SE CREA inputApellido
  const inputApellido = document.createElement("input");
  inputApellido.type = "text";
  inputApellido.id = "apellido";
  form.appendChild(inputApellido);

  // br
  form.appendChild(document.createElement("br"));

  // SE CREA labelNivel
  const labelNivel = document.createElement("label");
  labelNivel.for = "nivel";
  labelNivel.innerText = "Nivel de Entrenamiento";
  form.appendChild(labelNivel);

  // SE CREA selectNivel
  const selectNivel = document.createElement("select");
  selectNivel.id = "nivel";
  selectNivel.required = true;
  form.appendChild(selectNivel);

  // SE CREAN opciones de Nivel de Entrenamiento

  const opciones = ["principiante", "intermedio", "difícil"];
  for (const opcion of opciones) {
    const option = document.createElement("option");
    option.innerText = opcion.charAt(0).toUpperCase() + opcion.slice(1);
    selectNivel.appendChild(option);
  }

  // br
  form.appendChild(document.createElement("br"));

  // SE CREA el botón REGISTRARSE
  const boton = document.createElement("button");
  boton.type = "button";
  boton.id = "botonRegistrar";
  boton.innerText = "REGISTRARSE";
  boton.className = "btn";
  form.appendChild(boton);

  // Se INCORPORA el elemento form al elemento padre section

  const section = document.getElementById("container1");
  section.appendChild(form);
}

// FORMULARIO PARA DETERMINAR RUTINA

function crearFormularioDias() {
  const form = document.createElement("form");
  form.id = "";

  // SE CREA labelDia
  const labelDia = document.createElement("label");
  labelDia.for = "dia";
  labelDia.innerText = "Seleccione el Día de la Semana";
  form.appendChild(labelDia);

  // SE CREA selectDias
  const selectDias = document.createElement("select");
  selectDias.id = "dias";
  selectDias.required = true;
  form.appendChild(selectDias);

  // SE CREAN opciones de Dias

  let dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  for (const dia of dias) {
    const opcion = document.createElement("option");
    opcion.innerText = dia;
    selectDias.appendChild(opcion);
  }

  // br
  form.appendChild(document.createElement("br"));

  // SE CREA el botón CREAR RUTINA
  const boton = document.createElement("button");
  boton.type = "button";
  boton.id = "botonCreaRutina";
  boton.className = "btn";
  boton.innerText = "CREAR RUTINA";
  form.appendChild(boton);

  const section2 = document.getElementById("container2");
  section2.appendChild(form);
}

function registrarAlumnos() {
  let cargarNombre = document.getElementById("nombre").value;
  let cargarApellido = document.getElementById("apellido").value;
  let cargarNivel = document.getElementById("nivel").value.toLowerCase();

  const alumno = new Alumno(cargarNombre, cargarApellido, cargarNivel);

  alumnos.push(alumno);

  localStorage.setItem("alumnos", JSON.stringify(alumnos));
  document.getElementById("formRegistro").reset();
}

function determinarRutina(diaDeLaSemana) {
  switch (diaDeLaSemana) {
    case "lunes":
    case "viernes":
      return "piernas";
    case "martes":
    case "jueves":
      return "brazos";
    case "miercoles":
      return "día de descanso";
    default:
      return "día inválido";
  }
}

function comenzarClase(rutinaDelDia) {
  alumnos.forEach((alumno) => {
    let mensaje = document.createElement("h3")
    const section3 = document.getElementById("container3");
    section3.appendChild(mensaje)
    let tipoAlumno = alumno.nivelEjercicio;
    mensaje.innerText = `El alumno ${alumno.nombre} ${alumno.apellido} es de nivel: ` + tipoAlumno;
    switch (rutinaDelDia) {
      case "brazos":
        switch (tipoAlumno) {
          case "principiante":
            ejecutarRutina(
              alumno,
              ejerciciosBrazos,
              repeticionesBrazosFacil
            );
            break;
          case "intermedio": 
            ejecutarRutina(
              alumno,
              ejerciciosBrazos,
              repeticionesBrazosIntermedio
            );
            break;
          case "difícil": 
            ejecutarRutina(
              alumno,
              ejerciciosBrazos,
              repeticionesBrazosDificil
            );
            break;
        }
        break;
      case "piernas":
        switch (tipoAlumno) {
          case "principiante":
            ejecutarRutina(
              alumno,
              ejerciciosPiernas,
              repeticionesPiernasFacil
            );
            break;
          case "intermedio":
            ejecutarRutina(
              alumno,
              ejerciciosPiernas,
              repeticionesPiernasIntermedio
            );
            break;
          case "difícil":
            ejecutarRutina(
              alumno,
              ejerciciosPiernas,
              repeticionesPiernasDificil
            );
            break;
        }
        break;
      default:
        mensaje.innerText = `${alumno.nombre} ${alumno.apellido} hoy es tu día de descanso! Disfruta tu día libre!!`
        break;
    }
  });
}

function ejecutarRutina(alumno, ejercicios, repeticiones) {
  let mensaje = document.createElement("h4")
  mensaje.innerText = `El alumno ${alumno.nombre} ${alumno.apellido} debe realizar la siguiente rutina: `
  const section3 = document.getElementById("container3");
    section3.appendChild(mensaje);
  
    for (let c = 0; c < ejercicios.length; c++) {
    let parrafo1 = document.createElement("p");
    parrafo1.innerText = "Ejercicio: " + ejercicios[c] + "\n";
    let parrafo2 = document.createElement("p");
    parrafo2.innerText = "Cantidad de repeticiones: " + repeticiones[c] + "\n";
    section3.appendChild(parrafo1);
    section3.appendChild(parrafo2);
  }
}


