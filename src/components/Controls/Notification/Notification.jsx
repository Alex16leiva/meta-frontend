// src/ToastNotification.js
import React from 'react';
import { Toast } from 'primereact/toast';

const ToastNotification = React.forwardRef((props, ref) => {
    return (
        <Toast ref={ref} />
    );
});

const ToastNotificationService = (() => {
    let toastRef = null;

    const setRef = (ref) => {
        toastRef = ref;
    };

    const Info = (message) => {
        if (toastRef) {
            toastRef.show({ severity: 'info', summary: 'Información', detail: message, life: 3000 });
        }
    };

    const Success = (message) => {
        if (toastRef) {
            toastRef.show({ severity: 'success', summary: 'Éxito', detail: message, life: 3000 });
        }
    };

    const Warn = (message) => {
        if (toastRef) {
            toastRef.show({ severity: 'warn', summary: 'Advertencia', detail: message, life: 3000 });
        }
    };

    const Error = (message) => {
        if (toastRef) {
            toastRef.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }
    };

    return {
        setRef,
        Info,
        Success,
        Warn,
        Error,
    };
})();

export { ToastNotification, ToastNotificationService };
