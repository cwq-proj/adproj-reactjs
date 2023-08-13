import { Container, Card, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from 'axios';

function MaintainModel() {
    const primaryHeaderStyle = "h5";

    // replace the url here with the url in flask
    const createModelEndpoint = "http://localhost:8000/dashboard/users";
    // depending on response use null or []
    const [createModel, setCreateModel] = useState(null);
    // const [createModel, setCreateModel] = useState([]);

    // replace the url here with the url in flask
    const stopModelEndpoint = "http://localhost:8000/dashboard/users";
    // depending on response use null or []
    const [stopModel, setStopModel] = useState(null);
    // const [stopModel, setStopModel] = useState([]);

    const createModelApi = async () => {
        try {
            const response = await axios.get(createModelEndpoint, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setCreateModel(response.data);
        } catch (err) {
            if (err.response) {
                console.log("This is an error:", err.response);
            }
        }
        alert('create model complete');
    };

    const stopModelApi = async () => {
        try {
            const response = await axios.get(stopModelEndpoint, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setCreateModel(response.data);
        } catch (err) {
            if (err.response) {
                console.log("This is an error:", err.response);
            }
        }
        alert('create model complete');
    };

    return (
        <>
            <Container>
                <Card>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                        }}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant={primaryHeaderStyle}>Create and Initiate New Model</Typography>}
                            />
                        </ListItem>
                        <ListItem>
                            <Button
                                variant="outlined"
                                onClick={createModelApi}
                            >
                                Create
                            </Button>
                        </ListItem>
                    </List>
                </Card>
                <br />
                <Card>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                        }}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant={primaryHeaderStyle}>Stop and Deactivate Model</Typography>}
                            />
                        </ListItem>
                        <ListItem>
                            <Button
                                variant="outlined"
                                onClick={stopModelApi}
                            >
                                Deactivate
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Container>
        </>
    );
}

export default MaintainModel;