import { Link } from "react-router-dom";

export default function InventoryHeader({ searchTerm, setSearchTerm }) {
    return (
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
    )
}