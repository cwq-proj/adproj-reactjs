import React, { useEffect, useState } from 'react';
import api from '../../api/AxiosConfig';
import ShowAllTable from "./ShowAllTable";

function HealthRecordTable() {
    // update the variables
    const tableName = "All Health Records";
    const redirectLink = "https://example.com"
    const subUrl = "/dashboard/health-records";

    // get the data from the api
    const [data, setData] = useState([]);

    useEffect(() => {
        const getRecords = async () => {
            try {
                const response = await api.get(subUrl);
                const modifiedData = response.data.map(row => ({
                    ...row,
                    link: `${redirectLink}/${row.id}`
                }));
                setData(modifiedData);
            } catch (err) {
                if (err.response) {
                    console.log("this is an error");
                }
            }
        };
        getRecords();
    }, []);

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID'
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
        },
        {
            header: 'Link',
            accessorKey: 'link',
            footer: 'Link',
        },
    ]

    return (
        <>
            <ShowAllTable tableName={tableName} data={data} columns={columns}/>
        </>
    );
}

export default HealthRecordTable;
