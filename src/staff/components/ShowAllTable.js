import { flexRender, useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { Container } from "@mui/material";

function ShowAllTable(props) {
    // get the info
    const { tableName, data, columns } = props;

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
                                                                const year = result.substring(0, 4);
                                                                const month = result.substring(5, 7);
                                                                const day = result.substring(8, 10);
                                                                return `${day}/${month}/${year}`;
                                                            } else {
                                                                return "No value available";
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

export default ShowAllTable;