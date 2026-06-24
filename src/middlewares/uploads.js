import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Asegúrate de que la carpeta 'uploads/' exista en tu servidor
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    // Genera un nombre único para evitar colisiones
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Expresión regular actualizada para incluir formatos comunes
  // .jfif es una variante de jpeg
  const tiposPermitidos = /jpg|jpeg|png|gif|jfif|webp|bmp/;

  // Validar por extensión
  const extName = tiposPermitidos.test(
    path.extname(file.originalname).toLowerCase(),
  );

  // Validar por MIME type (ej. image/jpeg)
  // Nota: jfif suele tener mimetype 'image/jpeg'
  const mimeType = file.mimetype.startsWith("image/");

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    // Si falla, enviamos un error que el controlador podrá capturar
    cb(
      new Error("Formato de archivo no soportado. Solo se permiten imágenes."),
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Opcional: limita a 5MB para evitar ataques
});

export default upload;
