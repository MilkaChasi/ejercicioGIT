let nombreAlumno = prompt("Ingrese el nombre del alumno")
let Materia = prompt("Ingrese la materia")

// Solicitar las tres calificaciones y sus verificaciones
while (true) {
    let C1 = parseFloat(prompt("Ingresar la primera calificación"))
    if (isNaN(C1) && C1 >= 0 && C1 <= 10) {
        break
    } else { console.log("Revisar la primera calificación del/la alumno/a:" + nombreAlumno) }
}

while (true) {
    let C2 = parseFloat(prompt("Ingresar la segunda calificación"))
    if (isNaN(C2) && C2 >= 0 && C2 <= 10) {
        break
    } else { console.log("Revisar la segunda calificación del/la alumno/a:" + nombreAlumno) }
}

while (true) {
    let C3 = parseFloat(prompt("Ingresar la tercera calificación"))
    if (isNaN(C3) && C3 >= 0 && C3 <= 10) {
        break
    } else { console.log("Revisar la tercera calificación del/la alumno/a:" + nombreAlumno) }
}


// Calculo del promedio
let promedio = (C1 + C2 + C3) / 3

// Condicion del promedio

if (promedio >= 7) {
    console.log(nombreAlumno + ", ¡Felicidades! Has aprobado con un promedio de:" + promedio)
} else {
    console.log(nombreAlumno + ", gracias por tu esfuerzo. Nos vemos pronto en clases. El promedio obtenido es:" + promedio)
}

