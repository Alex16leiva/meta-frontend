import React, { useEffect } from 'react'
import { ToastNotification, ToastNotificationService } from './components/Controls/Notification/Notification'
import { AppRoutes } from './routes/AppRoutes'
import LoadingOverlay from './components/Controls/WaitControl/LoadingOverlay';

export const App = () => {
    const toastRef = React.useRef(null);

    useEffect(() => {
        ToastNotificationService.setRef(toastRef.current);
    }, []);

    return (
        <div>
            <LoadingOverlay />
            <ToastNotification ref={toastRef} />
            <AppRoutes />
        </div>
    )
}
