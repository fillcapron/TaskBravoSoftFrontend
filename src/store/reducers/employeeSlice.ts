import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Employee } from "../model"

interface Auth {
    employee: Employee[],
    isLoading: boolean,
    error: string
}

const initialState: Auth = {
    employee: [],
    isLoading: false,
    error: ''
}

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        employeeFetching(state) {
            state.isLoading = true;
        },
        employeeFetchingSuccess(state, action: PayloadAction<Employee[]>) {
            state.isLoading = false;
            state.error = '';
            state.employee = action.payload;
        },
        employeeFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { employeeFetching, employeeFetchingSuccess, employeeFetchingError } = employeeSlice.actions;
export default employeeSlice.reducer;