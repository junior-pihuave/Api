import { Router } from "express";
import { guardarPedido } from "../controladores/pedidos.ctrl.js"; // Asegúrate de que esta ruta sea correcta

const router = Router();

// Definir la ruta para crear un pedido
router.post("/pedidos", guardarPedido);

export default router;