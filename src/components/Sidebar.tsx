import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface SidebarProps {
    statusFilter: string;
    priorityFilter: string;
    setStatusFilter: (filter: "all" | "completed" | "incomplete") => void;
    setPriorityFilter: (filter: string) => void;
    setDateFilter: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
    openModal: () => void;
    resetFilters: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             statusFilter,
                                             priorityFilter,
                                             setStatusFilter,
                                             setPriorityFilter,
                                             setDateFilter,
                                             openModal,
                                             resetFilters
                                         }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const { formState: { errors } } = useForm();

    const handleDateFilter = () => {
        setDateFilter(startDate, endDate);
    };

    return (
        <Box sx={{ width: 250, padding: 2, backgroundColor: '#F9FAFB', height: '100vh', mt: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Фильтрация задач
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Фильтр по дате
                </Typography>
                <DesktopDatePicker
                    label="С даты"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    sx={{ mb: 2 }}
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
                <DesktopDatePicker
                    label="По дату"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    sx={{ mb: 2 }}
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
                    <Button variant="contained" onClick={handleDateFilter} fullWidth>
                        Применить
                    </Button>
                    <Button variant="outlined" onClick={resetFilters} fullWidth>
                        Очистить
                    </Button>
                </Box>
            </LocalizationProvider>

            <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Задачи</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Button
                        variant={statusFilter === 'all' ? 'contained' : 'outlined'}
                        color={statusFilter === 'all' ? 'primary' : 'default' as 'primary'}
                        onClick={() => setStatusFilter('all')}
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Все задачи
                    </Button>
                    <Button
                        variant={statusFilter === 'completed' ? 'contained' : 'outlined'}
                        color={statusFilter === 'completed' ? 'primary' : 'default' as 'primary'}
                        onClick={() => setStatusFilter('completed')}
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Выполненные
                    </Button>
                    <Button
                        variant={statusFilter === 'incomplete' ? 'contained' : 'outlined'}
                        color={statusFilter === 'incomplete' ? 'primary' : 'default' as 'primary'}
                        onClick={() => setStatusFilter('incomplete')}
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Невыполненные
                    </Button>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Приоритет</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {['low', 'medium', 'high'].map((priority) => (
                        <Button
                            key={priority}
                            variant={priorityFilter === priority ? 'contained' : 'outlined'}
                            color={priorityFilter === priority ? 'primary' : 'inherit'}
                            onClick={() => setPriorityFilter(priority)}
                            fullWidth
                            sx={{ mb: 1 }}
                        >
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </Button>
                    ))}
                </AccordionDetails>
            </Accordion>

            <Button variant="contained" onClick={openModal} sx={{ mt: 2 }} fullWidth>
                Добавить задачу
            </Button>
        </Box>
    );
};

export default Sidebar;