import { useEffect, useRef, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

function FetchEventSourceConfig(subUrl) {
    // const baseUrl = 'http://localhost:8000';
    const baseUrl = 'http://20.239.74.208:8000';
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        const jwtToken = localStorage.getItem('jwtToken');

        const fetchData = async () => {
            await fetchEventSource(`${baseUrl}/${subUrl}`, {
                method: 'GET',
                headers: {
                    Accept: 'text/event-stream',
                    // Add Authorization header if JWT token is available
                    ...(jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {}),
                },
                onopen(res) {
                    if (res.ok && res.status === 200) {
                        console.log('Connection made ', res);
                    } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
                        console.log('Client side error ', res);
                    }
                },
                onmessage(event) {
                    console.log(event.data);
                    const parsedData = JSON.parse(event.data);
                    setData((data) => [...data, parsedData]);
                },
                onclose() {
                    setIsLoading(false);
                    console.log('Connection closed by the server');
                },
                onerror(err) {
                    console.log('There was an error from the server', err);
                },
            });
        };
        fetchData();
    }, [subUrl]);

    return { data, isLoading };
}

export default FetchEventSourceConfig;
