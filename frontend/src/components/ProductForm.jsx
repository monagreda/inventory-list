import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Estado inicial del producto
const initialProductState = {
    name: '',
    sku: '',
    quantity: 0,
    price: 0.00,
    description: '',
    category: '' // Añadir un campo de ejemplo si es necesario
};

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialProductState);
    const [loading, setLoading] = useState(false);
    const isEditing = !!id;

    // Lógica para cargar datos si estamos editando
    useEffect(() => {
        if (isEditing) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`/api/products/${id}`);
                    setFormData(response.data);
                } catch (error) {
                    console.error("Error al cargar producto para edición:", error);
                    alert("No se pudo cargar el producto. ID inválido o error de conexión.");
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditing, navigate]);

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            // Convierte a número si es cantidad o precio
            [name]: (name === 'quantity' || name === 'price')
                ? (value === '' ? 0 : Number(value))
                : value
        }));
    };

    // Maneja el envío del formulario (POST o PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        //Debbuging
        console.log("Enviando datos del formulario:", formData);

        try {
            if (isEditing) {
                // EDITAR: PUT
                await axios.put(`/api/products/${id}`, formData);
                alert("Producto actualizado con éxito!");
            } else {
                // CREAR: POST
                await axios.post('/api/products', formData);
                alert("Producto creado con éxito!");
            }
            navigate('/'); // Regresa a la lista
        } catch (error) {
            console.error("Error al guardar producto:", error.response?.data || error.message);
            alert(`Error al guardar: ${error.response?.data?.error || 'Verifique los datos y el formato.'}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) return <p className="text-center text-xl mt-10">Cargando datos del producto...</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-3">
                {isEditing ? '✏️ Editar Producto' : '✨ Nuevo Producto'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Nombre */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>

                {/* SKU */}
                <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU (Código Único):</label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Cantidad */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Cantidad en Stock:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="0"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>

                    {/* Precio */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio ($):</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    ></textarea>
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition duration-150 disabled:opacity-50"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
                    </button>
                </div>
            </form>
        </div>
    );
}

