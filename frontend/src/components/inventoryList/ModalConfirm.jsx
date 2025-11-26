import React from "react";


const ModalConfirm = ({ isModalOpen, setIsModalOpen, confirmDelete }) => {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 transform transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmar Eliminación</h3>
                <p className="text-gray-600 mb-6">
                    ¿Estás seguro de que deseas eliminar este producto? Esta acción es irreversible.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                    >
                        Sí, Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;