import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Card } from "@mui/material";
import '../styles/TaskFilterActionBar.css';

interface TaskFilterProps {
    selectedDate: string;
    filterStatus: 'all' | 'created' | 'in-progress' | 'completed';
    filterTitle: string;
    onDateChange: (date: string) => void;
    onStatusChange: (status: 'all' | 'created' | 'in-progress' | 'completed') => void;
    onTitleChange: (title: string) => void;
    onAddTask: () => void;
}

const TaskFilterActionsBar = (props: TaskFilterProps) => {
    return (
        <Card className="filter-container">
            <FormControl fullWidth>
                <TextField
                    variant="outlined"
                    label="Select Date"
                    type="date"
                    value={props.selectedDate}
                    onChange={(e) => props.onDateChange(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    placeholder="Enter a title..."
                    variant="outlined"
                    label="Filter by title"
                    type="text"
                    value={props.filterTitle}
                    onChange={(e) => props.onTitleChange(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter by Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Filter by Status"
                    value={props.filterStatus}
                    onChange={(e) => props.onStatusChange(e.target.value as 'all' | 'created' | 'in-progress' | 'completed')}
                    fullWidth
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="created">Created</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>

            <Button className="add-button" onClick={props.onAddTask} color="success" variant="contained">Add Task</Button>
        </Card>
    );
};

export default TaskFilterActionsBar;
