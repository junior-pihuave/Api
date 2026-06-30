import { Router } from "express";
import { guardarPedido } from "../controladores/pedidos.ctrl.js";

const router = Router();
router.post("/pedidos", guardarPedido);

export default router;
