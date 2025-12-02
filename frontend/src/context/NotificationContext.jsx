import React, { createContext, useState, useContext, useCallback, use } from "react";

//Crear contexto
const NotificationContext = createContext();

// Crear el Custom hook para usarlo facilmente
export const useNotification = () => {
    return useContext(NotificationContext);
};

//Crear el Proveedor de contexto
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        isVisible: false, message: '',
        type: 'success', // 'success' o 'error'
    });

    //Funcion para mostrar la notificacion
    const showNotification = useCallback((message, type = 'success', duration = 3000) => {
        setNotification({
            isVisible: true,
            message,
            type
        });
        // Ocultar despues de 3 segundos
        setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }, duration);
    }, []);

    //Funcion para limpiar o forzar cierre
    const hideNotification = useCallback(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    }, []);

    const value = {
        notification,
        showNotification,
        hideNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}