import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { conmysql } from '../db.js';

export const login = async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const [rows] = await conmysql.query(
            'SELECT * FROM usuarios WHERE usr_usuario = ?',
            [usuario]
        );

        if (rows.length === 0) {

            return res.status(401).json({
                message: 'Usuario no existe'
            });

        }

        const usuarioBD = rows[0];

        const passwordMD5 = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');

        if (passwordMD5 !== usuarioBD.usr_clave) {

            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });

        }

        const token = jwt.sign(
            {
                id: usuarioBD.usr_id,
                usuario: usuarioBD.usr_usuario,
                nombre: usuarioBD.usr_nombre
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return res.json({
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: 'Error servidor'
        });

    }

};