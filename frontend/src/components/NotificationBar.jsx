import React from "react";
import { useNotification } from "../context/NotificationContext";

export default function NotificationBar() {
    // usamos el hook para acceder al estado de la notificacion
    const { notification, hideNotification } = useNotification();
    const { isVisible, message, type } = notification

    if (!isVisible) return null;

    //definir colores segun el tipo
    const baseClasses = "fixed bottom-4 right-4 p-4 rounded-lg shadow-xl z-50 transform transition-transform duration-300";
    const colorClasses = type === "succsess"
        ? "bg-green-500 text-white"
        : "bg-red-600 text-white";

    const Icon = type === "success" ? '✅' : '❌';

    return (
        <div className={`${baseClasses} ${colorClasses}`}>
            <div className="flex items-center justify-between space-x-4">
                <p className="font-semibold text-lg">{Icon} {message}</p>
                <button
                    onClick={hideNotification}
                    className="ml-4 text-white opacity-70 hover:opacity-100 transition"
                >
                    &times; {/* Símbolo X para cerrar */}
                </button>
            </div>
        </div>
    );
}