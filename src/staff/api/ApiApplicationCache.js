import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AjaxRxjs } from '../../api/AjaxRxjsConfig';

const subUrl = "/dashboard/application-cache";
const syncSubUrl = "/dashboard/sync-data"; // Sample sync data API endpoint
const subject = new BehaviorSubject([]);

const fetchDataObservable = new AjaxRxjs().getMethod(subUrl)
  .pipe(
    tap(response => {
      subject.next(response.response);
    }),
    catchError(error => {
      console.error("Error:", error);
      return [];
    })
  );

const syncDataObservable = new AjaxRxjs().getMethod(syncSubUrl) // Replace {} with your sync data payload
  .pipe(
    catchError(error => {
      console.error("Sync Error:", error);
      return [];
    })
  );

const ApiApplicationCache = () => {
  const [applicationCache, setApplicationCache] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    fetchDataObservable.subscribe({
      next: response => {
        console.log("API response:", response);
        setIsLoading(false);
      },
      error: error => {
        console.error("Error:", error);
        setIsLoading(false);
      }
    });
  };

  const syncAndFetch = () => {
    setIsLoading(true);
    syncDataObservable.subscribe({
      next: response => {
        console.log("Sync API response:", response);
        fetchData(); // Fetch fresh data after syncing
      },
      error: error => {
        console.error("Error during sync:", error);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);

  useEffect(() => {
    const subscription = subject.subscribe(records => {
      setApplicationCache(records);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { applicationCache, isLoading, fetchData, syncAndFetch };
};

export default ApiApplicationCache;

