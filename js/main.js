console.log(alert('Bienvenido a la Guía de Entrenamiento Virtual de Gym'))

let ejerciciosBrazos = ['flexiones', 'tríceps', 'bíceps'];
let repeticionesBrazosFacil = [5, 10, 15];
let repeticionesBrazosIntermedio = [10, 15, 20];
let repeticionesBrazosDificil = [15, 20, 25];

let ejerciciosPiernas = ['prensa', 'sentadillas', 'estocadas'];
let repeticionesPiernasFacil = [4, 8, 12];
let repeticionesPiernasIntermedio = [8, 12, 16];
let repeticionesPiernasDificil = [12, 16, 20];

let alumnos = [];
let nivelEjercicio = [];


registrarAlumnos()

let rutinaDelDia = determinarRutina(prompt('Ingrese el día de la semana').toLowerCase())
    console.log('La rutina del dia es: ' + rutinaDelDia)
    if (rutinaDelDia != 'día inválido') {
    comenzarClase(rutinaDelDia);
}


function registrarAlumnos() {
    let continuar = true;
    while (continuar) {

    let nombre = prompt('Por favor ingrese su Nombre y Apellido')
    alumnos.push(nombre);
    let nivel = prompt('Nivel de entrenamiento: Principiante, Intermedio o Difíci').toLocaleLowerCase()
    nivelEjercicio.push(nivel);
    let confirmacion = prompt('Desea registrar otro alumno? (si/no)').toLowerCase()
        if(confirmacion != "si") {
        continuar = false
}
}
    return alumnos
}

function determinarRutina(diaDeLaSemana) {
    switch(diaDeLaSemana){
        case 'lunes':
        case 'viernes':
            return 'piernas';
        case 'martes':
        case 'jueves':
            return 'brazos';
        case 'miercoles':
            return 'día de descanso';
        default:
            return 'día inválido';
    } 
}


function comenzarClase(rutinaDelDia) {
    for (let i=0; i < alumnos.length; i++) {
        let tipoAlumno = nivelEjercicio[i]
        console.log('El alumno es de nivel: ' + tipoAlumno)
        switch (rutinaDelDia) {
            case 'brazos': 
                switch(tipoAlumno) {
                    case 'principiante': 
                        ejecutarRutina(alumnos[i], ejerciciosBrazos, repeticionesBrazosFacil);
                        break;
                    case 'intermedio':
                        ejecutarRutina(alumnos[i], ejerciciosBrazos, repeticionesBrazosIntermedio)
                        break;
                    case 'difícil':
                        ejecutarRutina(alumnos[i], ejerciciosBrazos, repeticionesBrazosDificil)
                        break;
                    } 
            case 'piernas':
                switch(tipoAlumno) {
                case 'principiante': 
                        ejecutarRutina(alumnos[i], ejerciciosPiernas, repeticionesPiernasFacil);
                        break;
                    case 'intermedio':
                        ejecutarRutina(alumnos[i], ejerciciosPiernas, repeticionesPiernasIntermedio)
                        break;
                    case 'difícil':
                        ejecutarRutina(alumnos[i], ejerciciosPiernas, repeticionesPiernasDificil)
                        break;
                    }
            default:
                console.log('Hoy es tu día de descanso! Disfruta tu día libre!!');
}
        console.log('-------------------------')
        }
    }

function ejecutarRutina(alumno, ejercicios, repeticiones) {
        console.log('El alumno ' + alumno + ' debe realizar la siguiente rutina: ');
            for(let c = 0; c < ejercicios.length; c++) {
            console.log('Ejercicio: ' + ejercicios[c]);
            console.log('Cantidad de repeticiones: ' + repeticiones[c]);
        }
        console.log('Mucha suerte y que la fuerza te acompañe!')
}



