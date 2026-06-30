import { conmysql } from "../db.js";

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

    // Registro de cliente si es nuevo
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

    // Registro del pedido
    const [pedido] = await conexion.query(
      `INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) VALUES (?,?,?,?)`,
      [idCliente, ped_fecha, usr_id, ped_estado],
    );
    const ped_id = pedido.insertId;

    // Registro del detalle
    for (const item of detalle) {
      // Validar producto
      const [producto] = await conexion.query(
        "SELECT prod_id FROM productos WHERE prod_id=?",
        [item.prod_id],
      );
      if (producto.length === 0)
        throw new Error(`El producto ${item.prod_id} no existe.`);

      await conexion.query(
        `INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES (?,?,?,?)`,
        [item.prod_id, ped_id, item.det_cantidad, item.det_precio],
      );
    }

    await conexion.commit();
    res
      .status(201)
      .json({
        ok: true,
        mensaje: "Pedido registrado.",
        ped_id,
        cli_id: idCliente,
      });
  } catch (error) {
    await conexion.rollback();
    res.status(500).json({ ok: false, mensaje: error.message });
  } finally {
    conexion.release();
  }
};
