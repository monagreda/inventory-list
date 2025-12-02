const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Asegúrate de que tienes un archivo .env con MONGO_URI
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares ---
const allowedOrigins = [
    'https://inventory-list-tau.vercel.app', // Tu dominio Vercel
    'http://localhost:3000' // Para pruebas locales
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir peticiones sin origen (como Postman o CURL) o de los orígenes permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
};

app.use(cors(corsOptions)); // Permite peticiones del frontend de React
app.use(express.json()); // Parsea las peticiones con cuerpo JSON

// --- Conexión a MongoDB y Arranque del Servidor ---
async function startServer() {
    const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/inventarioDB';

    try {
        // Espera a que la conexión sea exitosa antes de continuar
        await mongoose.connect(dbUrl);
        console.log("Conexión a MongoDB exitosa");

        // --- Rutas (Solo se configuran después de la conexión) ---
        app.use('/api/products', productRoutes);

        // Inicia el servidor
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });

    } catch (err) {
        // Si hay un error de conexión (el origen de tu 500)
        console.error("⛔ FATAL: Error de conexión a MongoDB. El servidor no se iniciará.", err.message);
        // Opcional: Salir del proceso si la base de datos es crítica
        // process.exit(1); 
    }
}

// Llama a la función de inicio
startServer();

