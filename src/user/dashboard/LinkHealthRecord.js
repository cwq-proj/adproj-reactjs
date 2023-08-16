import React, { useEffect, useState } from 'react';
import HealthRecordForm from '../components/HealthRecordForm';
import { AjaxRxjs } from '../../api/AjaxRxjsConfig';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import ShowAllTable from '../../staff/components/ShowAllTable';
import jwtDecode from 'jwt-decode';

// This component will pass the userId, firstName, lastName to HealthRecordForm Component
function LinkHealthRecord() {
    const subUrl = "/health-records/get-records";

    const jwtToken = localStorage.getItem('jwtToken');
    const decodedToken = jwtToken ? jwtDecode(jwtToken) : null;

    const [userId, setUserId] = useState(decodedToken ? decodedToken.id.toString() : '');
    const [firstName, setFirstName] = useState(decodedToken ? decodedToken.firstname.toString() : '');
    const [lastName, setLastName] = useState(decodedToken ? decodedToken.lastname.toString() : '');

    const healthRecordsSubject = new BehaviorSubject([]);

    const requestData = {
        id: userId
    };

    const fetchDataObservable = new AjaxRxjs().postMethod(subUrl, requestData)
        .pipe(
            tap(response => {
                healthRecordsSubject.next(response.response); // Update healthRecords
            }),
            catchError(error => {
                console.error("Error:", error);
                return [];
            })
        );

    useEffect(() => {
        const subscription = fetchDataObservable.subscribe(); // Subscribe to the observable

        return () => subscription.unsubscribe(); // Cleanup the subscription
    }, []);

    // Subscribe to healthRecordsSubject to set the healthRecords state
    const [data, setData] = React.useState([]);
    useEffect(() => {
        const subscription = healthRecordsSubject.subscribe(records => {
            setData(records);
        });

        return () => subscription.unsubscribe();
    }, []);

    const columns = [
        {
            header: 'Date',
            accessorKey: 'createdDate',
            footer: 'Date'
        },
        {
            header: 'Male',
            accessorKey: 'male',
            footer: 'Male',
        },
        {
            header: 'Age',
            accessorKey: 'age',
            footer: 'Age',
        },
        {
            header: 'Education',
            accessorKey: 'education',
            footer: 'Education',
        },
        {
            header: 'Smoker',
            accessorKey: 'currentSmoker',
            footer: 'Smoker',
        },
        {
            header: 'cigsPerDay',
            accessorKey: 'cigsPerDay',
            footer: 'cigsPerDay',
        },
        {
            header: 'BPMeds',
            accessorKey: 'BPMeds',
            footer: 'BPMeds',
        },
        {
            header: 'Prevalent Stroke',
            accessorKey: 'prevalentStroke',
            footer: 'Prevalent Stroke',
        },
        {
            header: 'Prevalent Hypertension',
            accessorKey: 'prevalentHyp',
            footer: 'Prevalent Hypertension',
        },
        {
            header: 'Diabetes',
            accessorKey: 'diabetes',
            footer: 'Diabetes',
        },
        {
            header: 'Total Cholesterol',
            accessorKey: 'totChol',
            footer: 'Total Cholesterol',
        },
        {
            header: 'Systolic BP',
            accessorKey: 'sysBP',
            footer: 'Systolic BP',
        },
        {
            header: 'Diastolic BP',
            accessorKey: 'diaBP',
            footer: 'Diastolic BP',
        },
        {
            header: 'BMI',
            accessorKey: 'BMI',
            footer: 'BMI',
        },
        {
            header: 'Heart Rate',
            accessorKey: 'heartRate',
            footer: 'Heart Rate',
        },
        {
            header: 'Glucose',
            accessorKey: 'glucose',
            footer: 'Glucose',
        },
        {
            header: 'Ten Year CHD',
            accessorKey: 'tenYearCHD',
            footer: 'Ten Year CHD',
        }
    ]

    const tableName = "Your Health Records";

    return (
        <>
            {data.length ? (
                <div>
                    {data.length ? (
                        <>
                            <ShowAllTable tableName={tableName} data={data} columns={columns} />
                        </>

                    ) : (
                        <p>No health records available.</p>
                    )}
                </div>
            ) : (
                <>
                    <HealthRecordForm
                        columns={columns}
                        userId={userId}
                        firstName={firstName}
                        lastName={lastName}
                    />
                </>
            )}
        </>
    );

}

export default LinkHealthRecord;
