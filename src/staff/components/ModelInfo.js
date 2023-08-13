import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

function ModelInfo({ applicationCache }) {
    const selectedFeatures = applicationCache.modelInfo.selectedFeatures;
    const featureExtraction = applicationCache.modelInfo.featureExtraction;
    const targetLabel = applicationCache.modelInfo.targetLabel;
    const selectedModel = applicationCache.modelInfo.selectedModel;
    const performance = applicationCache.modelInfo.performance;

    const primaryHeaderStyle = "h5";
    const secondaryTextStyle = {
        fontSize: '1.2rem', // Adjust the font size as needed
    };

    return (
        <Card>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                <ListItem>
                    <h1>Model Information</h1>
                </ListItem>
                <Divider component="li" sx={{ borderBottomWidth: '1px', borderBottomColor: 'black' }} />
                <ListItem>
                    <ListItemText
                        primary={<Typography variant={primaryHeaderStyle}>Selected Features</Typography>}
                        secondary={
                            <Typography style={{ ...secondaryTextStyle, color: 'darkgrey' }}>
                                {selectedFeatures.join(', ')}
                            </Typography>}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText
                        primary={<Typography variant={primaryHeaderStyle}>Target Label</Typography>}
                        secondary={
                            <Typography style={{ ...secondaryTextStyle, color: 'darkgrey' }}>
                                {targetLabel}
                            </Typography>}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText
                        primary={<Typography variant={primaryHeaderStyle}>Feature Extraction Method</Typography>}
                        secondary={
                            <Typography style={{ ...secondaryTextStyle, color: 'darkgrey' }}>
                            {featureExtraction}
                            </Typography>}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText
                        primary={<Typography variant={primaryHeaderStyle}>Selected Model</Typography>}
                        secondary={
                            <Typography style={{ ...secondaryTextStyle, color: 'darkgrey' }}>
                                {selectedModel}
                            </Typography>}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText
                        primary={<Typography variant={primaryHeaderStyle}>Recall Score</Typography>}
                        secondary={
                            <Typography style={{ ...secondaryTextStyle, color: 'darkgrey' }}>
                                {performance}
                            </Typography>}
                    />
                </ListItem>
            </List>
        </Card>
    );
}

export default ModelInfo;
