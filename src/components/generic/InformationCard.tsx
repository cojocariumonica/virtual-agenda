import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import '../../styles/InformationCard.css';

interface IInformationCard {
    primaryInfo: string;
    secondaryInfo: string;
}

const InformationCard = (props: IInformationCard) => {
    return (
        <Box className="centered-box">
            <Card className="centered-card">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {props.primaryInfo}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        {props.secondaryInfo}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default InformationCard;
