export interface Task {
    id: number;
    title: string;
    description: string;
    date: string;  // YYYY-MM-DD
    status: 'created' | 'in-progress' | 'completed';
}
