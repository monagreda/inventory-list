import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

//URL base para la API de inventario
const API_URL = import.meta.env.VITE_API_URL;

export const useInventoryData = () => {

    //Estados de Datos
    const { showNotification } = useNotification();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");


    // Logica de Eliminacion (se queda en este hook)
    const [productToDelete, setProductToDelete] = useState(null);

    //Logica de Carga
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error al cargar el inventario", error);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : 'Error al conectar o consultar la base de datos (500 internal Server Error).';

            //modtrar error con el toast
            showNotification(`Error: ${errorMessage}. Revisa la conexion de MongoDB.`, 'error', 5000);
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]) // Ejecutar al montar y cuando fetchProducts cambie

    //Logica de filtrado
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

    //Logica de Delete
    const ConfirmDelete = async (idToDelete) => {
        if (!idToDelete) {
            showNotification("Error: ID de producto faltante o no válido.");
            return;
        }

        try {
            await axios.delete(`${API_URL}/api/products/${idToDelete}`);
            // Actualiza el estado filtrando la lista
            setProducts(products.filter(p => p._id !== idToDelete));
            showNotification("✅ Producto eliminado correctamente.");
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            showNotification("❌ Hubo un error al eliminar el producto.", 'error', 5000);
        } finally {
            //ya no necesitas setTimeout porque el NotificationContext lo maneja
            setProductToDelete(null); // Resetear el ID después de la eliminación
        }
    };

    //lo que el hook retorna
    return {
        products: filteredProducts, // Devolvemos la versión filtrada
        loading,
        searchTerm,
        setSearchTerm,
        ConfirmDelete,
        // Usamos productToDelete y setProductToDelete para manejar el ID en el Modal
        productToDelete,
        setProductToDelete,
    };
}
