import React from 'react';
import './App.css';
import { Container } from "@mui/material";
import TaskOverview from "./pages/TaskOverview";

function App() {
    return (
        <Container>
            <TaskOverview />
        </Container>
    );
}

export default App;
