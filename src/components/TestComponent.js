// import React, { useEffect } from 'react';
// import { AjaxRxjs } from '../api/AjaxRxjsConfig';
// import { BehaviorSubject } from 'rxjs';
// import { tap, catchError } from 'rxjs/operators';


// function TestComponent() {

//     const subUrl = "/dashboard/health-records";

//     const healthRecordsSubject = new BehaviorSubject([]); // BehaviorSubject for health records

//     const fetchDataObservable = new AjaxRxjs().getMethod(subUrl)
//         .pipe(
//             tap(response => {
//                 healthRecordsSubject.next(response.response); // Update healthRecords
//                 console.log("Data received:"); // Log received data
//             }),
//             catchError(error => {
//                 console.error("Error:", error);
//                 return [];
//             })
//         );

//     useEffect(() => {
//         const subscription = fetchDataObservable.subscribe(); // Subscribe to the observable

//         return () => subscription.unsubscribe(); // Cleanup the subscription
//     }, []);

//     // Subscribe to healthRecordsSubject to set the healthRecords state
//     const [healthRecords, setHealthRecords] = React.useState([]);
//     useEffect(() => {
//         const subscription = healthRecordsSubject.subscribe(records => {
//             setHealthRecords(records);
//         });

//         return () => subscription.unsubscribe();
//     }, []);


//     return (
//         <>

//             <h2>Here are your health records</h2>
//             <pre>{JSON.stringify(healthRecords, null, 2)}</pre>

//         </>
//     );

// }

// export default TestComponent;


// import React, { useEffect, useState } from 'react';

// function TestComponent() {
//     const subUrl = "http://localhost:8000/dashboard/health-records-sse";

//     const [healthRecords, setHealthRecords] = useState([]);
//     const [error, setError] = useState(null);
//     const [initialError, setInitialError] = useState(false);

//     useEffect(() => {
//         const eventSource = new EventSource(subUrl);

//         eventSource.onopen = () => {
//             console.log("EventSource opened");
//         };

//         eventSource.onmessage = event => {
//             try {
//                 const healthRecord = JSON.parse(event.data);
//                 console.log("Data received:", healthRecord);
//                 setHealthRecords(prevRecords => [...prevRecords, healthRecord]);
//             } catch (err) {
//                 setError("SSE Error: " + err.message);
//             }
//         };

//         eventSource.onerror = error => {
//             if (!initialError) {
//                 setInitialError(true); // Mark the initial error
//                 console.error("Initial SSE Connection Error: " + error);
//             } else {
//                 setError("SSE Error: " + error);
//             }
//         };

//         return () => {
//             eventSource.close();
//             console.log("EventSource closed");
//         };
//     }, []); // Empty dependency array for "once" effect

//     console.log("Rendering component");

//     return (
//         <>
//             <h2>Here are your health records</h2>
//             {error && !initialError ? (
//                 <div>Error: {error}</div>
//             ) : (
//                 <p>{healthRecords.length}</p>
//             )}
//         </>
//     );
// }

// export default TestComponent;



import React, { useEffect, useState } from 'react';

function TestComponent() {
    const subUrl = "http://localhost:8000/dashboard/health-records-sse";

    const [healthRecords, setHealthRecords] = useState([]);
    const [error, setError] = useState(null);
    const [initialError, setInitialError] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource(subUrl);

        eventSource.onopen = () => {
            console.log("EventSource opened");
        };

        eventSource.onmessage = event => {
            try {
                const healthRecord = JSON.parse(event.data);
                console.log("Data received:", healthRecord);
                setHealthRecords(prevRecords => [...prevRecords, healthRecord]);
            } catch (err) {
                setError("SSE Error: " + err.message);
            }
        };

        eventSource.onerror = error => {
            if (!initialError) {
                setInitialError(true); // Mark the initial error
                console.error("Initial SSE Connection Error: " + error);
            } else {
                setError("SSE Error: " + error);
            }
        };

        eventSource.onclose = () => {
            console.log("EventSource closed");
        };

        return () => {
            eventSource.close();
        };
    }, []); // Empty dependency array for "once" effect

    console.log("Rendering component");

    return (
        <>
            <h2>Here are your health records</h2>
            {error && !initialError ? (
                <div>Error: {error}</div>
            ) : (
                <p>{healthRecords.length}</p>
            )}
        </>
    );
}

export default TestComponent;
