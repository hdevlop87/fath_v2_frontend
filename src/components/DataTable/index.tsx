"use client"


import useReactTable from './Table/useReactTable';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Table from './Table';
import Cards from "./Cards";

function DataTable({
    data,
    columns,
    filters,
    mode = 'table',
    showHeader = true,
    showPagination = true,
    AddButton = null,
    showFilters = true,
    title = null,
    target = "",
    showMode = true
}) {

    const [renderMode, setRenderMode] = useState(mode);
    const table = useReactTable({ data, columns });


    useEffect(() => {
        table.setPageSize(1000)
        if (renderMode === "table") {
            table.setPageSize(10);
        }
    }, [renderMode, table]);

    return (
        <div className="w-full h-auto ">
            {showHeader && <Header table={table} title={title} showFilters={showFilters} filters={filters} setRenderMode={setRenderMode} target={target} showMode={showMode} />}
            {
                renderMode === 'table' ?
                    <Table table={table} columns={columns} showPagination={showPagination} /> :
                    <Cards table={table} AddButton={AddButton} target={target} />
            }
        </div>
    );
}

export default React.memo(DataTable);
