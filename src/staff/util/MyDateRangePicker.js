import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { AjaxRxjs } from "../../api/AjaxRxjsConfig";
import { Card, List, ListItem, ListItemText, Divider, Typography } from "@mui/material";

function MyDateRangePicker() {
  const [dates, setDates] = useState([]);
  const { RangePicker } = DatePicker;
  const [apiResponse, setApiResponse] = useState(null);
  const applicationCacheSubject = new BehaviorSubject([]);

  const fetchDataObservable = (dateRangeObject) =>
    new AjaxRxjs()
      .postMethod("/dashboard/new-users", dateRangeObject)
      .pipe(
        tap((response) => applicationCacheSubject.next(response.response)),
        catchError((error) => {
          console.error("Error:", error);
          return [];
        })
      );

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  const fetchData = (dateRangeObject) => {
    fetchDataObservable(dateRangeObject).subscribe({
      next: (response) => {
        console.log("API response:", response);
        setApiResponse(response.response);
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });
  };

  useEffect(() => {
    console.log("Fetching data...");
    const [startDate, endDate] = dates;

    const dateRangeObject = {
      dateFrom: startDate ? startDate.startOf('day').toDate() : null,
      dateTo: endDate ? endDate.endOf('day').toDate() : null,
    };

    fetchData(dateRangeObject);
  }, [dates]);

  useEffect(() => {
    const subscription = applicationCacheSubject.subscribe((records) => { });

    return () => subscription.unsubscribe();
  }, []);

  const handleClearClick = () => {
    setDates([]); // Always set dates to an empty array
    setApiResponse(null);
  };

  // Constraint: Convert null to an empty array [] for dates
  useEffect(() => {
    if (dates === null) {
      setDates([]);
    }
  }, [dates]);

  const primaryHeaderStyle = "h5";
  const secondaryTextStyle = {
    fontSize: '1.2rem',
  };

  return (
    <Card>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <Typography variant="h4">Number of New Users in Time Period</Typography>
        </ListItem>
        <Divider component="li" sx={{ borderBottomWidth: '1px', borderBottomColor: 'black' }} />
        <ListItem>
          <RangePicker
            value={dates}
            onChange={(newDates) => setDates(newDates)}
          />
          <Button onClick={handleClearClick}>Clear</Button>
        </ListItem>
        <Divider component="li" />
        {apiResponse && (
          <>
            <ListItem>
              <ListItemText
                primary={<Typography variant={primaryHeaderStyle}>
                  Date Range
                </Typography>}
                secondary={
                  <Typography style={{ ...secondaryTextStyle, color: 'darkgrey' }}>
                    {formatDate(apiResponse.dateFrom)} to {formatDate(apiResponse.dateTo)}
                  </Typography>}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={<Typography variant={primaryHeaderStyle}>
                  New Users
                </Typography>}
                secondary={
                  <Typography style={{ ...secondaryTextStyle, color: 'darkgrey' }}>
                    {apiResponse.numUsers}
                  </Typography>}
              />
            </ListItem>
          </>
        )}
      </List>
    </Card>
  );
}

export default MyDateRangePicker;
