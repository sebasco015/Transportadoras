const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let defectuosos = 0;
let aprobados = 10;
let camionActual = 0;

function preguntarCamion( numeroCamiones) {
  camionActual++;
  if (camionActual <= numeroCamiones) {
    console.log("Camion #" + camionActual);

    rl.question("Ingrese peso del vehiculo (total): ", (pesoTotal) => {
      rl.question("Ingrese peso del vehiculo vacio: ", (pesoVacio) => {
        rl.question("Ingrese Saco totales: ", (sacosTotal) => {
          for (let saco = 0; saco < (sacosTotal - aprobados); saco++) {
            let pesoSaco = Math.floor(Math.random() * 81);

            if (pesoSaco === 70) {
              aprobados++;
            } else if (pesoSaco < 70 || pesoSaco > 70) {
              defectuosos++;
            }
          }

          console.log("Sacos aprobados: " + aprobados);
          console.log("Sacos defectuosos: " + defectuosos);
          console.log("Peso a pagar al camionero es: " + (pesoTotal - pesoVacio));

          preguntarCamion(numeroCamiones);
        });
      });
    });
  } else {
    rl.close();
  }
}

rl.question("Ingrese el numero de espera de camiones: ", (numeroCamiones) => {
  preguntarCamion(numeroCamiones);
});