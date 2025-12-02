import { Link } from "react-router-dom";

export default function InventoryHeader({ product }) {
    return (
        <Link to={`/edit/${product._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md transition duration-150 text-sm shadow-sm">
                ✏️ Editar
            </button>
        </Link>
    )
}