import { flexRender, useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function ShowAllTableSSE(props) {
    // get the info
    const { isLoading, redirectLink, tableName, data, columns } = props;

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        columns: columns,
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <Container>
            <div>
                {isLoading ? (
                    <>
                        <h2>Loading Data...</h2>
                        <CircularProgress /> {/* Display CircularProgress */}
                    </>
                ) : (null)}
                <h1>{tableName}</h1>
                <div style={{ display: 'flex' }}>
                    <span>&nbsp;&nbsp;Search:&nbsp;&nbsp;</span>
                    <input
                        type="text"
                        id="filterInput"
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                    />
                    <br />
                </div>
                <><br /></>
                {data.length ? ( // Check if data is returned
                    <div className="w3-responsive">
                        <table className="w3-table-all w3-centered">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {/* for sorting */}
                                                {{ asc: " -ASC", desc: " -DESC" }[header.column.getIsSorted() ?? null]}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {cell.column.columnDef.accessorKey === "createdDate" ? (
                                                    <>
                                                        {(() => {
                                                            const context = cell.getContext();
                                                            if (context.getValue) {
                                                                const result = context.getValue();
                                                                const year = result[0];
                                                                const month = result[1];
                                                                const day = result[2];
                                                                return `${day}/${month}/${year}`;
                                                            } else {
                                                                return "No value available";
                                                            }
                                                        })()}
                                                    </>
                                                ) : cell.column.columnDef.accessorKey === "id" ? (
                                                    <>
                                                        {(() => {
                                                            const context = cell.getContext();
                                                            if (context.getValue) {
                                                                const rowId = context.getValue();
                                                                const modifiedLink = `${redirectLink}/${rowId}`;
                                                                return (
                                                                    <>
                                                                        <Link to={modifiedLink}>
                                                                            {rowId}
                                                                        </Link>
                                                                    </>
                                                                );
                                                            }
                                                        })()}
                                                    </>

                                                ) : (
                                                    <>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </>
                                                )}
                                            </td>

                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <button onClick={() => table.setPageIndex(0)}>First Page</button>
                            <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
                            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
                            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
                        </div>
                    </div>
                ) : (
                    <h1>No Data</h1>
                )}
            </div>
        </Container>
    );
}

export default ShowAllTableSSE;