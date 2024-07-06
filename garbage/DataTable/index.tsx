"use client"

import AlertDialog from '@/components/AlertDialog';
import useReactTable from './Table/useReactTable';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Table from './Table';
import Cards from "./Cards";

function DataTable({ data, columns, filters, cardComponent = null }) {
    
    const [renderMode, setRenderMode] = useState('table'); 
    const table = useReactTable({ data, columns });

    useEffect(() => {
        if (!cardComponent) {
            setRenderMode('table'); 
        }
    }, [cardComponent,renderMode]);

    return (
        <div className="w-full">
            <Header table={table} filters={filters} setRenderMode={setRenderMode} />
            {
                renderMode === 'table' ?
                    <Table table={table} columns={columns} /> :
                    cardComponent && <Cards table={table} Card={cardComponent} />
            }
            <AlertDialog />
        </div>
    );
}

export default React.memo(DataTable);
