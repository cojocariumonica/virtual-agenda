import React from 'react';
import { Task } from '../types/Task';
import { Button, Card, CardContent, Stack, Typography, Box } from "@mui/material";
import { Description as DescriptionIcon, Event as EventIcon, Info as InfoIcon } from '@mui/icons-material';
import '../styles/TaskItem.css';

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

const TaskItem = (props: TaskItemProps) => {
    let getItemStatus = (status: any) => {
        if (status === 'created') {
            return 'Created';
        }
        else if (status === 'in-progress') {
            return 'In Progress';
        }
        else if (status === 'completed') {
            return 'Completed';
        }
    }

    return (
        <Card className="task-card">
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Box display="flex" justifyContent="center" mb={2}>
                    <Typography variant="h5" color="textPrimary" gutterBottom textAlign="center" sx={{textTransform: 'capitalize'}}>
                        {props.task.title}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <DescriptionIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" color="textSecondary">{props.task.description}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <InfoIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" color="textSecondary">Status: {getItemStatus(props.task.status)}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <EventIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" color="textSecondary">Date: {props.task.date}</Typography>
                </Box>
            </CardContent>

            <Box p={1} pt={0}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Button variant="contained" onClick={() => props.onEdit(props.task)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => props.onDelete(props.task.id)}>Delete</Button>
                </Stack>
            </Box>
        </Card>
    );
};

export default TaskItem;
