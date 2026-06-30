import { Router } from "express";
// Asegúrate de importar todas las funciones necesarias desde tu controlador de clientes
import {
  postInsertarCliente,
  putCliente,
  patchCliente,
  deleteCliente,
} from "../controladores/clientes.Ctrl.js"; // O el nombre exacto de tu archivo

const router = Router();

// Rutas de Clientes
router.post("/clientes", postInsertarCliente);
router.put("/clientes/:id", putCliente);
router.patch("/clientes/:id", patchCliente);
router.delete("/clientes/:id", deleteCliente);

export default router;
