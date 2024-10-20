import TodoItem from './TodoItem';
import { Grid } from '@mui/material';
import { Todo, Priority } from './types';
import { Dayjs} from "dayjs";


interface TodoListProps {
    todos: Todo[];
    handleTodoCompleted: (id: string) => void;
    removeTodo: (id: string) => void;
    editTodo: (id: string, text: string, description: string, priority: Priority, dueDate: Dayjs | null) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, removeTodo, handleTodoCompleted, editTodo }) => {
    return (
        <Grid container spacing={2}>
            {todos.map((todo) => (
                <Grid item xs={12} sm={6} md={4} key={todo.id}>
                    <TodoItem
                        {...todo}
                        handleTodoCompleted={handleTodoCompleted}
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default TodoList;