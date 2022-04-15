import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Employee } from '../store/model';
import Stack from '@mui/material/Stack';

interface IProps {
    handleAddRow: (data: Employee) => void;
}

export const FormDialog: React.FC<IProps> = ({ handleAddRow }) => {
    const [open, setOpen] = useState(false);
    const { handleSubmit, control, reset } = useForm<Employee>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<Employee> = (data) => {
        console.log(data)
        //handleAddRow(data);
        handleClose()
    }

    return (
        <div>
            <Button variant="contained" sx={{ mb: 1 }} onClick={handleClickOpen}>
                Добавить сотрудника
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Введите данные</DialogTitle>
                <DialogContent>
                <Stack spacing={2} mb={2}>
                    <Controller
                        control={control}
                        name="fio"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="ФИО"
                                variant="outlined"
                                size='small'
                                margin='normal'
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                required={true}
                            />
                        )
                        }
                    />
                    <Controller
                        control={control}
                        name="timesheet_id"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="Табельный номер"
                                variant="outlined"
                                size='small'
                                margin='normal'
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                required={true}
                            />
                        )
                        }
                    />
                    <Controller
                        control={control}
                        name="position"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="Должность"
                                variant="outlined"
                                size='small'
                                margin='normal'
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                required={true}
                            />
                        )
                        }
                    />
                    <Controller
                        control={control}
                        name="date_employment"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="Дата трудоустройства"
                                variant="outlined"
                                size='small'
                                margin='normal'
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                required={true}
                            />
                        )
                        }
                    />
                    <Controller
                        control={control}
                        name="birth"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="Дата рождения"
                                variant="outlined"
                                size='small'
                                margin='normal'
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                required={true}
                            />
                        )
                        }
                    />
                    <Controller
                        control={control}
                        name="age"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="Полных лет"
                                variant="outlined"
                                size='small'
                                margin='normal'
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                            />
                        )
                        }
                    />
                    <Controller
                        control={control}
                        name="note"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="Примечание"
                                variant="outlined"
                                size='small'
                                margin='normal'
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                            />
                        )
                        }
                    />
                </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" variant="contained">Отмена</Button>
                    <Button type="submit" color="success" variant="contained">Добавить</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}