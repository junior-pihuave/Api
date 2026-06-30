import express from "express";
import cors from "cors";

import clientesRoutes from "./routes/clientes.routes.js";
import authRoutes from "./routes/auth.js";
import productosRoutes from "./routes/productos.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(express.json());

// 🔥 SERVIR IMÁGENES (CLAVE)
app.use("/uploads", express.static("uploads"));

// RUTAS
app.use("/api", authRoutes);
app.use("/api", clientesRoutes);
app.use("/api", productosRoutes);
app.use("/api", pedidosRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
