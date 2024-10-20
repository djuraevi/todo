import { Dayjs } from 'dayjs';

export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
    id: string;
    text: string;
    description?: string;
    priority: Priority;
    dueDate: Dayjs | null;
    completed: boolean;
}

