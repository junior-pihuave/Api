import { Router } from "express";
import {
  guardarPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarPedido,
  eliminarPedido,
} from "../controladores/pedidos.Ctrl.js";

const router = Router();

router.post("/pedidos", guardarPedido);
router.get("/pedidos", obtenerPedidos);
router.get("/pedidos/:id", obtenerPedidoPorId);
router.put("/pedidos/:id", actualizarPedido);
router.delete("/pedidos/:id", eliminarPedido);

export default router;
