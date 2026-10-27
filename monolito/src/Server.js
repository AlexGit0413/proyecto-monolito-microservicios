
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

// Verificar que el servidor funciona
app.get('/health', (req, res) => {
    res.json({ estado: 'ok' });
});

// Verificar la conexión con PostgreSQL
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        res.json({
            estado: 'ok',
            mensaje: 'Conexión con PostgreSQL correcta',
            fecha: result.rows[0].now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            estado: 'error',
            mensaje: 'No se pudo conectar con PostgreSQL'
        });
    }
});

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM usuarios ORDER BY id'
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al consultar usuarios'
        });
    }
});

// Obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM productos ORDER BY id'
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al consultar productos'
        });
    }
});

// Obtener todos los pedidos
app.get('/pedidos', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM pedidos ORDER BY id'
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al consultar pedidos'
        });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});
