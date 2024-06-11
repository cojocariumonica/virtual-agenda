import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskDialog from '../components/TaskDialog';
import TaskFilterActionsBar from '../components/TaskFilterActionsBar';
import {Box} from "@mui/material";
import { Task } from '../types/Task';
import '../styles/TaskOverview.css';
import InformationCard from "../components/generic/InformationCard";

const TaskOverview = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'created' | 'in-progress' | 'completed'>('all');
    const [filterTitle, setFilterTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(sortTasksByDate(storedTasks));
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, selectedDate, filterTitle, filterStatus, filteredTasks]);

    const sortTasksByDate = (tasks: Task[]) => {
        return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    const handleSaveTask = (task: Task) => {
        const updatedTasks = taskToEdit
            ? tasks.map((t) => (t.id === task.id ? task : t))
            : [...tasks, task];

        const sortedTasks = sortTasksByDate(updatedTasks);
        setTasks(sortedTasks);

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setDialogOpen(false);
        setTaskToEdit(null);
    };

    const handleDeleteTask = (id: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const filterTasks = () => {
        let filtered = tasks;
        if (selectedDate) {
            filtered = filtered.filter((task) => task.date === selectedDate);
        }
        if (filterStatus !== 'all') {
            filtered = filtered.filter((task) => task.status === filterStatus);
        }
        if (filterTitle) {
            filtered = filtered.filter((task) => task.title.toLowerCase().includes(filterTitle.toLowerCase()));
        }
        setFilteredTasks(filtered);
    };

    return (
        <div>
            <TaskFilterActionsBar
                selectedDate={selectedDate}
                filterStatus={filterStatus}
                filterTitle={filterTitle}
                onDateChange={setSelectedDate}
                onStatusChange={setFilterStatus}
                onTitleChange={setFilterTitle}
                onAddTask={() => { setTaskToEdit(null); setDialogOpen(true); }}
            />

            {filteredTasks.length > 0 ? (
                <Box className="task-list-container">
                    <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} onEdit={(task) => { setTaskToEdit(task); setDialogOpen(true); }} />
                </Box>
            ) : (
                <InformationCard primaryInfo="You have no tasks yet..." secondaryInfo="Start adding some tasks to get organized!"/>
            )}

            <TaskDialog open={dialogOpen} task={taskToEdit} onClose={() => setDialogOpen(false)} onSave={handleSaveTask} />
        </div>
    );
};

export default TaskOverview;
