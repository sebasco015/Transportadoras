// Importa las bibliotecas necesarias
const express = require("express");
const cors = require("cors");

// Crea un servidor web
const app = express();

app.use(cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "X-Requested-With"],
  }));

app.use(express.json());
// Define la ruta para procesar los datos
app.post("/procesar-datos", (req, res) => {
    
    try {
        // Obtiene los datos del camión numeroCamion
        const numeroCamion = req.body.numeroCamion
        const pesoCarroVacio = req.body.pesoCarroVacio
        const pesoCarroTotal = req.body.pesoCarroTotal

        if (!numeroCamion || !pesoCarroTotal || !pesoCarroVacio){
            res.status(400).send("Faltan datos en la solicitud")
            return;
          }

    
  // Calcula el peso exacto de la carga
  const pesoCarga = pesoCarroTotal - pesoCarroVacio
         
  // Clasifica los sacos de café
  const sacosDeCafe = []
  for (let i = 0; i < pesoCarga; i++) {
    const pesoSaco = Math.floor(Math.random() * 100)
    const categoriaSaco = pesoSaco === 70 ? "Especial" : "Defectuoso"
    sacosDeCafe.push({
      peso: pesoSaco,
      categoria: categoriaSaco,
    });
  }

  // Controla el espacio disponible en los contenedores
  const contenedores = []
  for (let i = 0; i < 10; i++) {
    const contenedor = {
      numero: i + 1,
      espacioDisponible: 1000,
      sacos: []
    };
    contenedores.push(contenedor)
  }

  // Procesa los sacos de café
  for (let saco of sacosDeCafe) {
    // Encuentra el contenedor con espacio disponible
    const contenedor = contenedores.find((c) => c.espacioDisponible > 0)
    if (!contenedor) {
        // Si no hay contenedores disponibles, envía un mensaje de error
        res.status(400).send("No hay contenedores disponibles");
        return;
      }
    // Agrega el saco al contenedor
    contenedor.espacioDisponible -= saco.peso
    contenedor.sacos.push(saco)

    // Si el contenedor está lleno, muestra un mensaje
    if (contenedor.espacioDisponible === 0) {
      res.send("Cambio de contenedor")
    }
  }

  // Muestra el mensaje "Cambio de camión"
  res.send("Cambio de camión")
} catch (error) {
    res.status(400).send(`Error: ${error.message}`)
}
});

// Inicia el servidor web
app.listen(8080, () => {
  console.log("Servidor web iniciado en el puerto 8080");
});
