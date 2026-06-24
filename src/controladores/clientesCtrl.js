import { conmysql } from "../db.js";

/* =========================
   GET TODOS CLIENTES
========================= */
export const getClientes = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM clientes");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar clientes",
      error: error.message,
    });
  }
};

/* =========================
   GET CLIENTE POR ID
========================= */
export const getClientesxid = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM clientes WHERE cli_id = ?",
      [req.params.id],
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

/* =========================
   🔥 NUEVO: GET POR CÉDULA (FALTABA)
========================= */
export const getClientePorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;

    const [result] = await conmysql.query(
      "SELECT * FROM clientes WHERE cli_identificacion = ?",
      [cedula],
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

/* =========================
   INSERTAR CLIENTE
========================= */
export const postInsertarCliente = async (req, res) => {
  try {
    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
    } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO clientes
      (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
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

    res.json({ cli_id: result.insertId });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

/* =========================
   PUT CLIENTE
========================= */
export const putCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE clientes SET
        cli_identificacion=?,
        cli_nombre=?,
        cli_telefono=?,
        cli_correo=?,
        cli_direccion=?,
        cli_pais=?,
        cli_ciudad=?
      WHERE cli_id=?`,
      [
        cli_identificacion,
        cli_nombre,
        cli_telefono,
        cli_correo,
        cli_direccion,
        cli_pais,
        cli_ciudad,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json({ message: "Cliente modificado" });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

/* =========================
   PATCH CLIENTE
========================= */
export const patchCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE clientes SET
        cli_identificacion = IFNULL(?, cli_identificacion),
        cli_nombre = IFNULL(?, cli_nombre),
        cli_telefono = IFNULL(?, cli_telefono),
        cli_correo = IFNULL(?, cli_correo),
        cli_direccion = IFNULL(?, cli_direccion),
        cli_pais = IFNULL(?, cli_pais),
        cli_ciudad = IFNULL(?, cli_ciudad)
      WHERE cli_id = ?`,
      [
        cli_identificacion,
        cli_nombre,
        cli_telefono,
        cli_correo,
        cli_direccion,
        cli_pais,
        cli_ciudad,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json({ message: "Cliente actualizado parcialmente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

/* =========================
   DELETE CLIENTE
========================= */
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await conmysql.query(
      "DELETE FROM clientes WHERE cli_id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};
