import dayjs from 'dayjs';
import { Todo } from './types';

const initialTodos: Todo[]  = [
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'пресс качат', description: 'Упражнение для пресса, 3 подхода по 20 раз', dueDate: dayjs('2024-11-03'), priority: 'low', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'бегит', description: 'Пробежка на 5 километров в парке', dueDate: dayjs('2024-10-25'), priority: 'medium', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'турник', description: 'Подтягивания на турнике, 4 подхода по 10 раз', dueDate: dayjs('2024-10-30'), priority: 'high', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'анжуманя', description: 'Разминка суставов и йога на 30 минут', dueDate: dayjs('2024-10-28'), priority: 'low', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'гантбли', description: 'Упражнения с гантелями, 3 подхода по 15 раз', dueDate: dayjs('2024-11-01'), priority: 'medium', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'пресс качат', description: 'Повторение упражнения для пресса', dueDate: dayjs('2024-11-03'), priority: 'low', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'бегит', description: 'Ещё одна пробежка на 5 километров', dueDate: dayjs('2024-10-25'), priority: 'medium', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'турник', description: 'Повторение подтягиваний на турнике', dueDate: dayjs('2024-10-30'), priority: 'high', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'анжуманя', description: 'Разминка и йога с медитацией', dueDate: dayjs('2024-10-28'), priority: 'low', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'гантбли', description: 'Повторение упражнений с гантелями', dueDate: dayjs('2024-11-01'), priority: 'medium', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'пресс качат', description: 'Упражнение для пресса, 3 подхода по 20 раз', dueDate: dayjs('2024-11-03'), priority: 'low', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'бегит', description: 'Пробежка на 5 километров в парке', dueDate: dayjs('2024-10-25'), priority: 'medium', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'турник', description: 'Подтягивания на турнике, 4 подхода по 10 раз', dueDate: dayjs('2024-10-30'), priority: 'high', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'анжуманя', description: 'Разминка суставов и йога на 30 минут', dueDate: dayjs('2024-10-28'), priority: 'low', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'гантбли', description: 'Упражнения с гантелями, 3 подхода по 15 раз', dueDate: dayjs('2024-11-01'), priority: 'medium', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'пресс качат', description: 'Повторение упражнения для пресса', dueDate: dayjs('2024-11-03'), priority: 'low', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'бегит', description: 'Ещё одна пробежка на 5 километров', dueDate: dayjs('2024-10-25'), priority: 'medium', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'турник', description: 'Повторение подтягиваний на турнике', dueDate: dayjs('2024-10-30'), priority: 'high', completed: false },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'анжуманя', description: 'Разминка и йога с медитацией', dueDate: dayjs('2024-10-28'), priority: 'low', completed: true },
    { id: `${new Date().toISOString()}-${Math.random()}`, text: 'гантбли', description: 'Повторение упражнений с гантелями', dueDate: dayjs('2024-11-01'), priority: 'medium', completed: false }
];

export default initialTodos;