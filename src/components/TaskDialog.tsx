import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import'../styles/TaskDialog.css';

interface TaskDialogProps {
    open: boolean;
    task: Task | null;
    onClose: () => void;
    onSave: (task: Task) => void;
}

const TaskDialog = (props: TaskDialogProps) => {
    const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState<'created' | 'in-progress' | 'completed'>('created');

    useEffect(() => {
        if (props.task) {
            setIsInEditMode(true);
            setTitle(props.task.title);
            setDescription(props.task.description);
            setDate(props.task.date);
            setStatus(props.task.status);
        }
    }, [props.task]);

    const resetDialog = () => {
        setIsInEditMode(false);
        setTitle('');
        setDescription('');
        setDate('');
        setStatus('created');
    }

    const handleSave = () => {
        const newTask = props.task
            ? { ...props.task, title, description, date, status }
            : { id: Date.now(), title, description, date, status };
        props.onSave(newTask);

        resetDialog();
        props.onClose();
    };

    const handleCancel = () => {
        resetDialog();
        props.onClose()
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '90%',
                    maxWidth: '600px',
                    padding: '20px',
                    '@media (min-width: 600px)': {
                        padding: '20px',
                    },
                },
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    {props.task ? <EditIcon /> : <AddCircleOutlineIcon />}
                    <Typography variant="h5">{props.task ? 'Edit Task' : 'Add Task'}</Typography>
                </Stack>
            </DialogTitle>

            <DialogContent className="dialog-content">
                <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                    <TextField
                        size="medium"
                        variant="standard"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                    <TextField
                        size="medium"
                        variant="standard"
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </FormControl>

                {isInEditMode && (
                    <FormControl fullWidth variant="standard" sx={{ marginBottom: '16px' }}>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            size="medium"
                            label="Status"
                            labelId="status-select-label"
                            id="status-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'created' | 'in-progress' | 'completed')}
                            fullWidth
                        >
                            <MenuItem value="created">Created</MenuItem>
                            <MenuItem value="in-progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                )}

                <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                    <TextField
                        size="medium"
                        rows="2"
                        variant="standard"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                    />
                </FormControl>
            </DialogContent>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mt="10px">
                <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" onClick={handleSave} disabled={!title && !date}>Save</Button>
            </Stack>
        </Dialog>
    );
};

export default TaskDialog;
