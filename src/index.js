import app from "./app.js";

// Render inyecta su propio puerto en process.env.PORT.
// Si no existe (estás en local), usa el 3000.
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor está ejecutando en el puerto ${PORT}`);
});
