import React from 'react';
import { Task } from '../types/Task';
import TaskItem from '../components/TaskItem';
import '../styles/TaskList.css';

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

const TaskList = (props: TaskListProps) => {
    return (
        <div className="task-list">
            {props.tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={props.onDelete} onEdit={props.onEdit} />
            ))}
        </div>
    );
};

export default TaskList;
