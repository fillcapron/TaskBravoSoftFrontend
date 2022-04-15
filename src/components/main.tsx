import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Employee } from '../store/model';
import { getEmployee } from '../store/reducers/actionCreator';
import { escapeRegExp, getAge, getDate } from '../utils';
import { FormDialog } from './formDialog';
import { QuickSearchToolbar } from './search';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    {
        field: 'fio',
        headerName: 'ФИО',
        headerAlign: 'center',
        width: 200,
        editable: false,
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
        width: 170,
        type: 'date',
        valueGetter: getDate,
    },
    {
        field: 'birth',
        headerName: 'Дата рождения',
        width: 130,
        type: 'date',
        valueGetter: getDate,
    },
    {
        field: 'age',
        headerName: 'Полных лет',
        width: 100,
        type: 'number',
        valueGetter: getAge,
    },
    {
        field: 'note',
        headerName: 'Примечания',
        width: 180,
        type: 'string',
        headerAlign: 'center',
    },
];

//TODO Перенести datagrid в отдельный компонент

export const Main: React.FC = () => {

    const dispatch = useAppDispatch();
    const token = useAppSelector(token => token.authSlice.token);
    const { employee, isLoading } = useAppSelector(employee => employee.employeeSlice);

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<Employee[]>(employee);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = employee.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
                return searchRegex.test(row[field]?.toString());
            });
        });
        setRows(filteredRows);
    };

    const handleAddRow = (data: Employee) => {
        setRows((prevRows) => [...prevRows, data]);
      };

    useEffect(() => {
        if (token) dispatch(getEmployee(token));
        if (employee.length) setRows(employee);
    }, [dispatch, token]);

    return (
        <div style={{ height: 600, width: '100%' }}>
            <Typography variant='h4' component="div" mb={2} sx={{ textAlign: 'center' }}>
                Данные по сотрудникам
            </Typography>
            <FormDialog handleAddRow={handleAddRow}/>
            <DataGrid
                components={{ Toolbar: QuickSearchToolbar }}
                loading={isLoading}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                disableColumnMenu
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                            requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
            />
        </div>
    )
}