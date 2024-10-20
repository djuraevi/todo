import { Tooltip, IconButton, Card, CardActions, CardContent, Typography, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TodoModal from "./TodoModal";
import { Dayjs } from "dayjs";
import {Priority} from "./types.ts";



interface TodoModalValues {
    text: string;
    description: string;
    priority: Priority;
    selectedDate: Dayjs | null;
}

interface TodoItemProps {
    id: string;
    text: string;
    description?: string;
    priority: Priority;
    dueDate: Dayjs | null;
    completed: boolean;
    removeTodo: (id: string) => void;
    handleTodoCompleted: (id: string) => void;
    editTodo: (id: string, text: string, description: string, priority: Priority, dueDate: Dayjs | null) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
                                               id,
                                               text,
                                               description,
                                               priority,
                                               dueDate,
                                               completed,
                                               removeTodo,
                                               handleTodoCompleted,
                                               editTodo
                                           }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleEdit = () => {
        setModalOpen(true);
    };

    const priorityColors: Record<Priority, { backgroundColor: string; color: string }> = {
        low: { backgroundColor: '#c8e6c9', color: '#2e7d32' },
        medium: { backgroundColor: '#fff9c4', color: '#f57f17' },
        high: { backgroundColor: '#ffccbc', color: '#c62828' },
    };

    return (
        <>
            <Card
                key={id}
                sx={{
                    maxWidth: 345,
                    backgroundColor: completed ? '#F0F0F0' : '#F9FAFB',
                    boxShadow: completed ? 'none' : 5,
                    borderRadius: 4,
                }}
            >
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            color: completed ? '#B0B0B0' : '#1976D2',
                            textDecoration: completed ? 'line-through' : 'none',
                        }}
                    >
                        {text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Срок выполнения: {dueDate ? dueDate.format('MM/DD/YYYY') : 'Не установлено'}
                    </Typography>
                    <Chip
                        label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                        sx={{
                            marginTop: 1,
                            backgroundColor: priorityColors[priority].backgroundColor,
                            color: priorityColors[priority].color,
                            borderRadius: 12,
                        }}
                    />
                </CardContent>
                <CardActions sx={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    {!completed && (
                        <>
                            <Tooltip title="Завершить задачу" arrow>
                                <IconButton
                                    color="success"
                                    onClick={() => handleTodoCompleted(id)}
                                    aria-label="done"
                                >
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Редактировать" arrow>
                                <IconButton
                                    onClick={handleEdit}
                                    aria-label="edit"
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                    <Tooltip title="Удалить" arrow>
                        <IconButton
                            color="error"
                            onClick={() => removeTodo(id)}
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <TodoModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                addTodo={(text: string, description: string, priority: Priority, selectedDate: Dayjs | null) => {
                    editTodo(id, text, description, priority, selectedDate);
                    setModalOpen(false);
                }}
                defaultValues={{ text, description, priority, selectedDate: dueDate } as TodoModalValues}
            />
        </>
    );
};

export default TodoItem;