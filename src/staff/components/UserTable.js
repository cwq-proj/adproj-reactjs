import ShowAllTableSSE from "./ShowAllTableSSE";
import FetchEventSourceConfig from '../../api/FetchEventSourceConfig';

function UserTable() {
    // update the variables
    const tableName = "All User Records";
    const redirectLink = "https://example.com"
    const subUrl = "dashboard/users";

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
    ]

    return (
        <>
            <ShowAllTableSSE isLoading={isLoading} redirectLink={redirectLink} tableName={tableName} data={data} columns={columns} />
        </>
    );
}

export default UserTable;