import { Router } from "express";
// Cambia 'pedidos.ctrl.js' por 'pedidos.Ctrl.js' (respetando la C mayúscula)
import { guardarPedido } from "../controladores/pedidos.Ctrl.js";

const router = Router();
router.post("/pedidos", guardarPedido);

export default router;
