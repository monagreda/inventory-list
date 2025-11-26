const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose')

//Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error("⛔ Error Mongoose al obtener productos (GET /):", err.message);

        res.status(500).json({
            error: 'Error al obtener productos',
            details: err.message // Enviar el mensaje de error real
        })
    }
});

//Crear producto
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear productos' })
    }
});

//Obtener producto por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto' })
    }
});

//Actualizar producto por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el producto' })
    }
});

//Eliminar producto por ID
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'ID de producto no válido' });
        }

        const deleteProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deleteProduct) return res.status(404).json({ error: 'Producto no encontrado' });

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) { // <--- CORREGIDO: Uso de llaves { }
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;