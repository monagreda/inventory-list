export default function InventoryHeader({ product, handleDelete }) {
    return (
        <button
            onClick={() => handleDelete(product._id)}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md transition duration-150 text-sm shadow-sm"
        >
            🗑️ Eliminar
        </button>
    )
}