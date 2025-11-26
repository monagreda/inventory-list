import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import ProductRow from "./inventoryList/ProductRow";
import ModalConfirm from "./inventoryList/ModalConfirm";

export default function InventoryList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    //estados para el Modal de Confirmacion
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [message, setMessage] = useState("");

    //cargar inicio
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Llama a la API de Express. 
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error al cargar el inventario", error);

                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : 'Error al conectar o consultar la base de datos (500 Internal Server Error).';

                setMessage(`Error: ${errorMessage}. Revisa tu conexión a MongoDB.`);

            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []); // Se ejecuta solo una vez al montar

    //Logica de Filtrado y Busqueda
    const filteredProducts = useMemo(() => {
        if (!searchTerm) {
            return products;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        return products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearch) ||
            product.sku.toLowerCase().includes(lowerCaseSearch)
        );
    }, [products, searchTerm]);

    //Abre el modal y guarda el ID del producto
    const handleDelete = (id) => {
        setProductToDelete(id);
        setIsModalOpen(true);
    }

    // Confirma y ejecuta la eliminacion


    // NOTA: Reemplazar window.confirm/alert con un modal personalizado en producción.
    const ConfirmDelete = async () => {

        //cierra el modal de inmediato
        setIsModalOpen(false);

        if (!productToDelete) {

            setMessage("Error interno: No hay producto selecionado para eliminar");
            return;
        }
        const idToDelete = productToDelete;
        if (!idToDelete) {
            setMessage("Error: ID de producto faltante o no válido.")
            setProductToDelete(null);
            return;
        }
        try {
            const deleteURL = `/api/products/${idToDelete}`;
            console.log(`[FRONTEND DEBUG] intentando eliminar ID: ${idToDelete} via DELETE a ${deleteURL} `)
            // Llama a la ruta DELETE /api/products/:id
            await axios.delete(deleteURL);

            // Actualiza el estado de React (sin recargar la página)
            setProducts(products.filter(p => p._id !== idToDelete));
            alert("Producto eliminado correctamente.");

        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Hubo un error al eliminar el producto.");
        } finally {
            setProductToDelete(null); //Limpiar el ID
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    };

    if (loading) return <p className="text-center text-xl mt-10 text-indigo-600">Cargando inventario..</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Inventario Actual</h2>

            {/* Mensaje de estado (exito/error) */}
            {message && (
                <div className={`p-3 mb-4 rounded-lg text-white ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
                    {message}
                </div>
            )}


            <div className="mb-6 flex justify-between items-center space-x-4">
                <Link to="/new">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150">
                        ➕ Agregar Nuevo Producto
                    </button>
                </Link>

                {/* search bar */}
                <input
                    type="text"
                    placeholder="Buscar por Nombre o SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                />
            </div>

            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                    {searchTerm ? 'No se encontraron productos que coincidan con la búsqueda.' : 'No hay productos en el inventario. Agrega uno nuevo.'}
                                </td>
                            </tr>
                        ) : (
                            // uso de ProductRow
                            filteredProducts.map(product => (
                                <ProductRow
                                    key={product._id}
                                    product={product}
                                    handleDelete={handleDelete}
                                />
                            ))
                        )}
                    </tbody>
                </table>
                {/* mensaje de no enconttrado si el termino de busqueda  no coincide */}
                {searchTerm && filteredProducts.length === 0 && (
                    <div className="p-4 text-center text-gray-600 bg-white">
                        No se encontraron resultados para "{searchTerm}"
                    </div>
                )}
            </div>
            {/* uso del confirmationModal */}
            <ModalConfirm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                ConfirmDelete={ConfirmDelete}
            />
        </div>
    );
}
