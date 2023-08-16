import React, { useState, useEffect, useCallback } from "react";
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

  const fetchDataObservable = useCallback((dateRangeObject) =>
    new AjaxRxjs()
      .postMethod("/dashboard/new-users", dateRangeObject)
      .pipe(
        tap((response) => applicationCacheSubject.next(response.response)),
        catchError((error) => {
          console.error("Error:", error);
          return [];
        })
      ), []);

  const formatDateFrom = (date) => {
    if (date === null) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 1);
      return currentDate.toISOString().substring(0, 10);
    }

    const formattedDate = new Date(date).toISOString().substring(0, 10);
    return formattedDate;
  };

  const formatDateTo = (date) => {
    if (date === null) {
      return new Date().toISOString().substring(0, 10);
    }

    const formattedDate = new Date(date).toISOString().substring(0, 10);
    return formattedDate;
  };

  const fetchData = useCallback((dateRangeObject) => {
    console.log(dateRangeObject);
    fetchDataObservable(dateRangeObject).subscribe({
      next: (response) => {
        console.log("API response:", response);
        setApiResponse(response.response);
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });
  }, [fetchDataObservable]);

  useEffect(() => {
    console.log("Fetching data...");
    const [startDate, endDate] = dates;

    const formatDateToISOString = (date) => {
      if (!date) return null;
      return date.toISOString();
    };

    const formatDateToUTC = (date) => {
      if (!date) return null;
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      return formatDateToISOString(utcDate);
    };

    const dateRangeObject = {
      dateFrom: formatDateToUTC(startDate ? startDate.toDate() : null),
      dateTo: formatDateToISOString(endDate ? endDate.endOf('day').toDate() : null),
    };
    fetchData(dateRangeObject);
  }, [dates, fetchData]);

  useEffect(() => {
    const subscription = applicationCacheSubject.subscribe((records) => { });

    return () => subscription.unsubscribe();
  }, [applicationCacheSubject]);

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
                    {formatDateFrom(apiResponse.dateFrom)} to {formatDateTo(apiResponse.dateTo)}
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
