import React, { useEffect, useState } from 'react';
import api from '../../api/AxiosConfig';
import ShowAllTable from "./ShowAllTable";

function SensitiveInfoTable() {
     // update the variables
     const tableName = "All Sensitive Info Records";
     const redirectLink = "https://example.com"
     const subUrl = "/dashboard/sensitive-info";
 
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
            header: 'NRIC',
            accessorKey: 'nric',
            footer: 'NRIC',
        },
        {
            header: 'First Name',
            accessorKey: 'firstName',
            footer: 'First Name',
        },
        {
            header: 'Last Name',
            accessorKey: 'lastName',
            footer: 'Last Name',
        },
        {
            header: 'Phone Number',
            accessorKey: 'phoneNumber',
            footer: 'Phone Number',
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

export default SensitiveInfoTable;
