// /frontend/src/hooks/useProductForm.js

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNotification } from '../context/NotificationContext'; // Importar el hook de notificación
import { productSchema } from "../utils/productSchema";

// URL BASE
const API_URL = import.meta.env.VITE_API_URL; // Asegúrate que el puerto y /api/ sean correctos

const initialProductState = {
    name: '',
    sku: '',
    quantity: 0,
    price: 0.00,
    description: '',
    category: ''
};

// El hook recibe el ID y el callback de navegación
export const useProductForm = (productId, navigateCallback) => {

    const [formData, setFormData] = useState(initialProductState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isEditing = !!productId;

    const { showNotification } = useNotification(); // Usar el hook de notificación

    // Lógica para cargar datos si estamos editando
    useEffect(() => {
        if (isEditing) {
            const fetchProduct = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`${API_URL}/api/products/${productId}`);
                    setFormData(response.data);
                } catch (err) {
                    console.error("Error al cargar producto para edición:", err);
                    setError("No se pudo cargar el producto. ID inválido o error de conexión.");
                    showNotification("No se pudo cargar el producto. ID inválido o error de conexión.", 'error');
                    navigateCallback('/'); // Navegar de vuelta en caso de error fatal
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        } else {
            setFormData(initialProductState);
        }
    }, [productId, isEditing, navigateCallback, showNotification]);

    // Maneja el envio de formulario (POST o PUT)
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: (name === 'quantity' || name === 'price')
                ? (value === '' ? 0 : Number(value))
                : value
        }));
    }, []);

    // Maneja el envío del formulario (POST o PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        //validacion ZOD
        try {
            //ejecutar validacion con zod
            productSchema.parse(formData);

        } catch (validationError) {
            setLoading(false);

            // Manejar errores de zod
            if (validationError.errors) {
                const firstError = validationError.errors[0].message;
                setError(firstError);
                showNotification(`Error de validación: ${firstError}`, 'error', 5000);
            } else {
                setError('error de validacion desconocido');
                showNotification('Error de validación desconocido', 'error');
            }
            return; // detener el envío si hay errores de validación
        }
        //fin validacion ZOD

        //si la validacion pasa, continuar con el envio
        try {
            if (isEditing) {
                // EDITAR: PUT
                await axios.put(`${API_URL}/api/products/${productId}`, formData);
                showNotification("Producto actualizado con éxito!", 'success');
            } else {
                // CREAR: POST
                await axios.post(`${API_URL}/api/products`, formData);
                showNotification("Producto creado con éxito!", 'success');
            }
            navigateCallback('/'); // Navegar solo si es exitoso
        } catch (err) {
            console.error("Error al guardar producto:", err.response?.data || err.message);
            const errorMessage = err.response?.data?.error || 'Verifique los datos y el formato.';
            setError(`Error al guardar: ${errorMessage}`);
            showNotification(`Error al guardar: ${errorMessage}`, 'error', 5000);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        isEditing,
        handleChange,
        handleSubmit,
    };
};
