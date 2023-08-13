import api from '../../api/AxiosConfig';
import { useEffect, useState } from 'react';
import ShowAllTable from './ShowAllTable';

function StaffTable() {
    // update the variables
    const tableName = "All Staff Records";
    const redirectLink = "https://example.com"
    const subUrl = "/dashboard/staff";

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
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email',
        },
        {
            header: 'Username',
            accessorKey: 'username',
            footer: 'UserName',
        },
        {
            header: 'Role',
            accessorKey: 'role',
            footer: 'Role'
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

export default StaffTable;