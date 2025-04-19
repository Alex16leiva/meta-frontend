import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    permisos: [],
    logged: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);

            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.permisos = action.payload.permisos;
            state.logged = true;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            state.permisos = [];
            state.logged = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
