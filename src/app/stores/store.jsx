import { configureStore } from '@reduxjs/toolkit';
import userReducer from './../../features/userSlice';
import authReducer from './../../features/authSlice';
import screenReducer from './../../containers/MainScreen/screenSlicer';
import loadingReducer from './../../components/Controls/WaitControl/loadingSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        screen: screenReducer,
        loading: loadingReducer,
    },
});