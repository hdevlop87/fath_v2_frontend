"use client"

import React from "react";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

import { flexRender } from "@tanstack/react-table";
import { TablePagination } from './TablePagination'

const shTable = ({ table, columns, showPagination = true }) => {


   return (
      <div className="flex flex-col gap-4 ">
         <div className="rounded-md border">
            <Table>
               <TableHeader className="bg-primary">
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id} className="hover:bg-primary">
                        {headerGroup.headers.map((header) => (
                           <TableHead key={header.id} className="text-white ">
                              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                           </TableHead>
                        ))}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-16 text-center">
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         {
            showPagination &&
            <TablePagination table={table}/>
         }
      </div>
   );
}


export default shTable;