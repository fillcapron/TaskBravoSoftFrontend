import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Auth {
    token: string,
    isLoading: boolean,
    error: string
}

const initialState: Auth = {
    token: '',
    isLoading: false,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFetching(state) {
            state.isLoading = true;
        },
        authFetchingSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = '';
            state.token = action.payload;
        },
        authFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { authFetching, authFetchingSuccess, authFetchingError } = authSlice.actions;
export default authSlice.reducer;