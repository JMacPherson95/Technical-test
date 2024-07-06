import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || false,
    },
    reducers: {
        loginSuccess: (state) => {
            state.loggedIn = true;
            localStorage.setItem('loggedIn', true);
        },
        logoutSuccess: (state) => {
            state.loggedIn = false;
            localStorage.setItem('loggedIn', false);
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
