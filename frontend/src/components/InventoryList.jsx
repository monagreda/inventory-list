import React, { useState } from "react";
import { useInventoryData } from "../hooks/useInventoryData";


import InventoryHeader from "./reusables/InventoryHeader";
import ProductRow from "./inventoryList/ProductRow";
import ModalConfirm from "./inventoryList/ModalConfirm";

export default function InventoryList() {

    //estados para el Modal de Confirmacion
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Llamada al custom hook
    const {
        products, //ahora son los productos filtrados
        loading,
        message,
        searchTerm,
        setSearchTerm,
        ConfirmDelete, // Funcion para borrar
        productToDelete, //Id del producto a borrar
        setProductToDelete, // Funcion para establecer el Id
    } = useInventoryData();

    //Abre el modal y guarda el ID del producto
    const handleDelete = (id) => {
        setProductToDelete(id);
        setIsModalOpen(true);
    }

    // Confirma y ejecuta la eliminacion
    const handleConfirmDelete = async () => {
        setIsModalOpen(false); //Cierra el modal primero
        ConfirmDelete(productToDelete) // Ejecuta la elimminacion
        setProductToDelete(null); // Limpia el ID
    }
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


            <InventoryHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                    {searchTerm ? 'No se encontraron productos que coincidan con la búsqueda.' : 'No hay productos en el inventario. Agrega uno nuevo.'}
                                </td>
                            </tr>
                        ) : (
                            // uso de ProductRow
                            products.map(product => (
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
                {searchTerm && products.length === 0 && (
                    <div className="p-4 text-center text-gray-600 bg-white">
                        No se encontraron resultados para "{searchTerm}"
                    </div>
                )}
            </div>
            {/* uso del confirmationModal */}
            <ModalConfirm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                ConfirmDelete={handleConfirmDelete}
            />
        </div>
    );
}
