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
        addEmployee(state, action: PayloadAction<Employee>) {
            state.employee.push(action.payload);
        },
        deleteEmployee(state, action: PayloadAction<number[]>) {
            const ids = new Set(action.payload);
            state.employee = state.employee.filter((element) => !ids.has(element.id as number));
        },
        updateEmployee(state, action: PayloadAction<Employee>) {
            state.employee = state.employee.map((element) => {
                if (element.id === action.payload.id) {
                    return action.payload;
                }
                return element;
            })
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

export const { employeeFetching, addEmployee, deleteEmployee, updateEmployee, employeeFetchingSuccess, employeeFetchingError } = employeeSlice.actions;
export default employeeSlice.reducer;