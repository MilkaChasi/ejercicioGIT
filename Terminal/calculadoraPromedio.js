let nombreAlumno = prompt("Ingrese el nombre del alumno")
let Materia = prompt("Ingrese la materia")

// Solicitar las tres calificaciones 
let C1 = parseFloat(prompt("Ingresar la primera calificacion"))
let C2 = parseFloat(prompt("Ingresar la segunda calificacion"))
let C3 = parseFloat(prompt("Ingresar la tercera calificacion"))

//Verificacion de calificaciones, rango: 0-10

if (isNaN(C1) || isNaN(C2) || isNaN(C3) || C1 < 0 || C1 > 10 || C2 < 0 || C2 > 10 || C3 < 0 || C3 > 10) {
    console.log("Revisar las calificaciones del/la alumno/a:" + nombreAlumno)
} else {

    // Calculo del promedio
    let promedio = (C1 + C2 + C3) / 3

    // Condicion del promedio

    if (promedio >= 7) {
        console.log(nombreAlumno + ", ¡Felicidades! Has aprobado con un promedio de:" + promedio)
    } else {
        console.log(nombreAlumno + ", gracias por tu esfuerzo. Nos vemos pronto en clases. El promedio obtenido es:" + promedio)
    }
}

