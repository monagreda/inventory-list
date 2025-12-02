// /frontend/src/components/ProductForm.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductForm } from '../hooks/useProductForm'; // Importar el Custom Hook

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Obtener toda la lógica del Custom Hook, pasándole el ID y el callback de navegación
    const {
        formData,
        loading,
        error,
        isEditing,
        handleChange,
        handleSubmit
    } = useProductForm(id, navigate);

    // El handleSubmit del hook ahora maneja el envío y la navegación internamente.

    if (loading && isEditing) {
        return <p className="text-center text-xl mt-10">Cargando datos del producto...</p>;
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-3">
                {isEditing ? '✏️ Editar Producto' : '✨ Nuevo Producto'}
            </h2>

            {/* Mostrar el error que viene del hook */}
            {error && (
                <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
                    {error}
                </div>
            )}

            {/* 2. onSubmit llama al handleSubmit del hook */}
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Nombre */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange} // Viene del hook
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
                <div>
                    {/* Cantidad */}
                    <div className="grid grid-cols-2 gap-6">

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
                </div>

                {/* Descripcion */}
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

                {/* Categoria */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
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