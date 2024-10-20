import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useForm, Controller } from 'react-hook-form';
import { Dayjs } from 'dayjs';
import { Priority } from './types';

interface TodoModalProps {
    open: boolean;
    handleClose: () => void;
    addTodo: (text: string, description: string, priority: Priority, selectedDate: Dayjs | null) => void;
    defaultValues?: {
        text: string;
        description?: string;
        priority: Priority;
        selectedDate: Dayjs | null;
    };
}

interface FormData {
    text: string;
    description?: string;
    selectedDate: Dayjs | null;
    priority: Priority;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const TodoModal: React.FC<TodoModalProps> = ({ open, handleClose, addTodo, defaultValues }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            text: defaultValues?.text || '',
            description: defaultValues?.description || '',
            selectedDate: defaultValues?.selectedDate || null,
            priority: defaultValues?.priority || 'low',
        },
    });

    const onSubmit = (data: FormData) => {
        if (data.selectedDate) {
            addTodo(data.text, data.description || '', data.priority, data.selectedDate);
            reset();
            handleClose();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Название задачи обязательно' }}
                            render={({ field }) => (
                                <TextField
                                    label="Название задачи"
                                    {...field}
                                    fullWidth
                                    error={!!errors.text}
                                    sx={{ mb: 2 }}
                                    helperText={errors.text ? errors.text.message : ''}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    label="Описание задачи"
                                    {...field}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                        <Controller
                            name="selectedDate"
                            control={control}
                            defaultValue={null}
                            rules={{ required: 'Срок выполнения обязателен' }}
                            render={({ field: { onChange, value } }) => (
                                <DesktopDatePicker
                                    label="Срок выполнения"
                                    value={value}
                                    onChange={onChange}
                                    slots={{
                                        textField: (params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.selectedDate}
                                                helperText={errors.selectedDate ? errors.selectedDate.message : ''}
                                                sx={{ mb: 2 }}
                                            />
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="priority"
                            control={control}
                            defaultValue="low"
                            render={({ field }) => (
                                <TextField
                                    select
                                    label="Приоритет"
                                    {...field}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    {['low', 'medium', 'high'].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <Button variant="contained" type="submit" fullWidth>
                            Сохранить изменения
                        </Button>
                    </form>
                </LocalizationProvider>
            </Box>
        </Modal>
    );
};

export default TodoModal;