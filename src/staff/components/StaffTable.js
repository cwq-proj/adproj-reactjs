import ShowAllTableSSE from "./ShowAllTableSSE";
import FetchEventSourceConfig from '../../api/FetchEventSourceConfig';

function StaffTable() {
    // update the variables
    const tableName = "All Staff Records";
    const redirectLink = "http://localhost:3000/accounts/update"
    const subUrl = "dashboard/staff";

    const { data, isLoading } = FetchEventSourceConfig(subUrl);

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
    ]

    return (
        <>
            <ShowAllTableSSE isLoading={isLoading} redirectLink={redirectLink} tableName={tableName} data={data} columns={columns} />
        </>
    );
}

export default StaffTable;