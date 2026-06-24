import express from "express";
import cors from "cors";

import clientesRoutes from "./routes/clientes.routes.js";
import authRoutes from "./routes/auth.js";
import productosRoutes from "./routes/productos.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// SERVIR IMÁGENES
app.use("/uploads", express.static("uploads"));

// rutas
app.use("/api", authRoutes);
app.use("/api", clientesRoutes);
app.use("/api", productosRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;