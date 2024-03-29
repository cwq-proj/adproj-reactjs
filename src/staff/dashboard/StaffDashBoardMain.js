import React from "react";
import { Container, Grid, Paper, Button, Card } from "@mui/material";
import StaffDashBoardHealthRecordCards from "./StaffDashBoardHealthRecordCards";
import ApiApplicationCache from "../api/ApiApplicationCache";
import ModelInfo from "../components/ModelInfo";
import MyDateRangePicker from "../util/MyDateRangePicker";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

function StaffDashBoardMain() {
  const { applicationCache, isLoading, fetchData, syncAndFetch } =
    ApiApplicationCache();

  const secondaryTextStyle = {
    fontSize: "1.2rem",
  };

  return (
    <div>
      <Container>
        <Button variant="contained" onClick={syncAndFetch} disabled={isLoading}>
          {isLoading
            ? "Syncing..."
            : "Sync and Update Model Information & Graphs"}
        </Button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ModelInfo applicationCache={applicationCache} />
          </>
        )}
        <br />
        <MyDateRangePicker />
        <br />
        <Card>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem>
              <Typography variant="h4">Graphs</Typography>
            </ListItem>
            <Divider
              component="li"
              sx={{ borderBottomWidth: "1px", borderBottomColor: "black" }}
            />
            <ListItem>
              <ListItemText>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <Typography
                      style={{ ...secondaryTextStyle, color: "darkgrey" }}
                    >
                      <span>
                        &nbsp;&nbsp;last updated: &nbsp;
                        {/* {(() => {
                          const [year, month, day] =
                            applicationCache.lastUpdated;
                          const formattedDate = new Date(
                            year,
                            month - 1,
                            day
                          ).toLocaleDateString();
                          return formattedDate;
                        })()} */}
                        {(() => {
                          const formattedDate = applicationCache.lastUpdated.substring(0, 10);
                          return formattedDate;
                        })()}
                      </span>
                    </Typography>
                  </>
                )}
              </ListItemText>
            </ListItem>
            <Divider component="li" />
          </List>
          {isLoading ? ( // Conditionally render based on isLoading
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <Grid container spacing={3}>
                  <StaffDashBoardHealthRecordCards
                    applicationCache={applicationCache}
                  />
                </Grid>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default StaffDashBoardMain;
