import React from "react";
import { Link } from "react-router-dom";


const ProductRow = React.memo(({ product, handleDelete }) => {
    // Determina el color del badge de stock
    const stockClass = product.quantity > 10
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800';

    return (
        <tr key={product._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockClass}`}>
                    {product.quantity}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">${product.price ? product.price.toFixed(2) : '0.00'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">

                {/* Botón EDITAR */}
                <Link to={`/edit/${product._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md transition duration-150 text-sm shadow-sm">
                        ✏️ Editar
                    </button>
                </Link>

                {/* Botón ELIMINAR */}
                <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md transition duration-150 text-sm shadow-sm"
                >
                    🗑️ Eliminar
                </button>
            </td>
        </tr>
    );
});

export default ProductRow;