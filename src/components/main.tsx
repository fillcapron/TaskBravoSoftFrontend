import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getEmployee } from '../store/reducers/actionCreator';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    {
        field: 'fio',
        headerName: 'ФИО',
        width: 200,
        editable: true,
        type: 'string'
    },
    {
        field: 'timesheet_id',
        headerName: 'Табельный номер',
        width: 150,
        editable: false,
        type: 'number'
    },
    {
        field: 'position',
        headerName: 'Должность',
        type: 'string',
        width: 110,
        editable: true
    },
    {
        field: 'date_employment',
        headerName: 'Дата трудоустройства',
        width: 200,
        type: 'date'
    },
    {
        field: 'birth',
        headerName: 'Дата рождения',
        width: 150,
        type: 'date'
    },
    {
        field: 'age',
        headerName: 'Полных лет',
        width: 110,
        type: 'number'
    },
    {
        field: 'note',
        headerName: 'Примечания',
        width: 110,
        type: 'string'
    },
];

export const Main: React.FC = () => {

    const dispatch = useAppDispatch();
    const token = useAppSelector(token => token.authSlice.token);
    const employee = useAppSelector(employee => employee.employeeSlice.employee);

    useEffect(() => {
        if (token) {
            dispatch(getEmployee(token));
        }
    }, [dispatch, token])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant='h4' component="div">
                Данные по сотрудникам
            </Typography>
            <DataGrid
                rows={employee}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}