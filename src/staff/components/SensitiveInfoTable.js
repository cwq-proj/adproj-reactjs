import ShowAllTableSSE from "./ShowAllTableSSE";
import FetchEventSourceConfig from '../../api/FetchEventSourceConfig';

function SensitiveInfoTable() {
    // update the variables
    const tableName = "All Sensitive Info Records";
    const redirectLink = "http://localhost:3000/patients/update"
    const subUrl = "dashboard/sensitive-info";

    const { data, isLoading } = FetchEventSourceConfig(subUrl);

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
    ]

    return (
        <>
            <ShowAllTableSSE isLoading={isLoading} redirectLink={redirectLink} tableName={tableName} data={data} columns={columns} />
        </>
    );
}

export default SensitiveInfoTable;