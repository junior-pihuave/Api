import { conmysql } from "../db.js";

// POST: Registrar pedido completo
export const guardarPedido = async (req, res) => {
  const conexion = await conmysql.getConnection();
  try {
    await conexion.beginTransaction();
    const {
      cli_id,
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
      ped_fecha,
      usr_id,
      ped_estado,
      detalle,
    } = req.body;

    if (!detalle || detalle.length === 0)
      throw new Error("El pedido no tiene productos.");

    let idCliente = Number(cli_id);
    if (idCliente === 0) {
      const [cliente] = await conexion.query(
        `INSERT INTO clientes (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) VALUES (?,?,?,?,?,?,?)`,
        [
          cli_identificacion,
          cli_nombre,
          cli_telefono,
          cli_correo,
          cli_direccion,
          cli_pais,
          cli_ciudad,
        ],
      );
      idCliente = cliente.insertId;
    }

    const [pedido] = await conexion.query(
      `INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) VALUES (?,?,?,?)`,
      [idCliente, ped_fecha, usr_id, ped_estado],
    );
    const ped_id = pedido.insertId;

    for (const item of detalle) {
      await conexion.query(
        `INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES (?,?,?,?)`,
        [item.prod_id, ped_id, item.det_cantidad, item.det_precio],
      );
    }
    await conexion.commit();
    res.status(201).json({ ok: true, mensaje: "Pedido registrado.", ped_id });
  } catch (error) {
    await conexion.rollback();
    res.status(500).json({ ok: false, mensaje: error.message });
  } finally {
    conexion.release();
  }
};

// GET: Listar todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM pedidos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Placeholder para otras funciones
export const obtenerPedidoPorId = async (req, res) => {
  res.json({ mensaje: "Pendiente" });
};
export const actualizarPedido = async (req, res) => {
  res.json({ mensaje: "Pendiente" });
};
export const eliminarPedido = async (req, res) => {
  res.json({ mensaje: "Pendiente" });
};
