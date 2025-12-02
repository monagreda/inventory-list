import React from "react";
import { Link } from "react-router-dom";
import EditButton from "../reusables/EditButton";
import DeleteButton from "../reusables/DeleteButton";


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
                <EditButton product={product} />
                {/* Botón ELIMINAR */}
                <DeleteButton product={product} handleDelete={handleDelete} />
            </td>
        </tr>
    );
});

export default ProductRow;