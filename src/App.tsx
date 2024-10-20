import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import TodoModal from "./components/TodoModal";
import initialTodos from './components/initialTodos';
import { Dayjs } from 'dayjs';
import { Todo, Priority } from './components/types';


const App = () => {
    const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "incomplete">("all");
    const [priorityFilter, setPriorityFilter] = useState<"all" | string>("all");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const addTodo = (text: string, description: string, priority: Priority, dueDate: Dayjs | null) => {
        const newTodo: Todo = {
            id: new Date().toISOString(),
            text,
            description,
            priority,
            dueDate,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const editTodo = (id: string, text: string, description: string, priority: Priority, dueDate: Dayjs | null) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, text, description, priority, dueDate }
                : todo
        ));
    };

    const filteredTodos = todos.filter(todo => {
        const statusMatch =
            statusFilter === "all" ||
            (statusFilter === "completed" && todo.completed) ||
            (statusFilter === "incomplete" && !todo.completed);

        const priorityMatch = priorityFilter === "all" || todo.priority === priorityFilter;


        const dateMatch =
            (!startDate || todo.dueDate!.valueOf() >= startDate.valueOf()) &&
            (!endDate || todo.dueDate!.valueOf() <= endDate.valueOf());

        return statusMatch && priorityMatch && dateMatch;
    });

    const resetFilters = () => {
        setStatusFilter("all");
        setPriorityFilter("all");
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Sidebar
                    statusFilter={statusFilter}
                    priorityFilter={priorityFilter}
                    setStatusFilter={setStatusFilter}
                    setPriorityFilter={setPriorityFilter}
                    setDateFilter={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    openModal={() => setModalOpen(true)}
                    resetFilters={resetFilters}
                />
                <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Задачи
                    </Typography>

                    <TodoList
                        todos={filteredTodos}
                        handleTodoCompleted={(id: string) => {
                            setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: true } : todo)));
                        }}
                        removeTodo={(id: string) => {
                            setTodos(todos.filter(todo => todo.id !== id));
                        }}
                        editTodo={editTodo}
                    />
                </Container>
            </Box>
            <Footer />
            <TodoModal open={modalOpen} handleClose={() => setModalOpen(false)} addTodo={addTodo} />
        </Box>
    );
};

export default App;