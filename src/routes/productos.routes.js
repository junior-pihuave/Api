import { Router } from "express";
import upload from "../middlewares/uploads.js";

import {
  getProductos,
  postInsertarProducto,
  putProducto,
  deleteProducto,
} from "../controladores/productosCtrl.js";

const router = Router();

router.get("/productos", getProductos);

router.post("/productos", upload.single("prod_imagen"), postInsertarProducto);

router.put("/productos/:id", upload.single("prod_imagen"), putProducto);

router.delete("/productos/:id", deleteProducto);

export default router;
