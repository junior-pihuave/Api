import { conmysql } from "../db.js";

/* =========================
   GET PRODUCTOS
========================= */
export const getProductos = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM productos");

    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar productos",
      detalles: error.message,
    });
  }
};

/* =========================
   INSERTAR PRODUCTO
========================= */
export const postInsertarProducto = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } =
      req.body;

    let prod_imagen = null;

    // 🔥 FIX IMPORTANTE
    if (req.file) {
      prod_imagen = "uploads/" + req.file.filename;
    }

    const [result] = await conmysql.query(
      `INSERT INTO productos
      (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        prod_codigo,
        prod_nombre,
        prod_stock,
        prod_precio,
        prod_activo,
        prod_imagen,
      ],
    );

    res.json({
      prod_id: result.insertId,
      imagen: prod_imagen,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error al insertar producto",
    });
  }
};

/* =========================
   ACTUALIZAR PRODUCTO
========================= */
export const putProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } =
      req.body;

    let prod_imagen = req.body.prod_imagen;

    if (req.file) {
      prod_imagen = "uploads/" + req.file.filename;
    }

    await conmysql.query(
      `UPDATE productos SET
        prod_codigo=?,
        prod_nombre=?,
        prod_stock=?,
        prod_precio=?,
        prod_activo=?,
        prod_imagen=?
       WHERE prod_id=?`,
      [
        prod_codigo,
        prod_nombre,
        prod_stock,
        prod_precio,
        prod_activo,
        prod_imagen,
        id,
      ],
    );

    res.json({ message: "Producto actualizado" });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al actualizar producto",
    });
  }
};

/* =========================
   DELETE PRODUCTO
========================= */
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    await conmysql.query("DELETE FROM productos WHERE prod_id=?", [id]);

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar producto",
    });
  }
};
