import { Router } from "express";
import { verificarToken } from "../middlewares/auth.js";

import {
  getClientes,
  getClientesxid,
  getClientePorCedula,
  postInsertarCliente,
  putCliente,
  patchCliente,
  deleteCliente,
} from "../controladores/clientes.Ctrl.js";

const router = Router();

/* GET */
router.get("/clientes", verificarToken, getClientes);
router.get("/clientes/:id", getClientesxid);

/* 🔥 NUEVO: por cédula */
router.get("/clientes/cedula/:cedula", getClientePorCedula);

/* CRUD */
router.post("/clientes", postInsertarCliente);
router.put("/clientes/:id", putCliente);
router.patch("/clientes/:id", patchCliente);
router.delete("/clientes/:id", deleteCliente);

export default router;
