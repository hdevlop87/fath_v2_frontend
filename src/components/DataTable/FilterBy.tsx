"use client"

import { Input } from "@/components/ui/input";
import SelectFilter from './SelectFilter'

const AutoFilter = ({ table, filter }) => {
  return (
    <>
      {{
        'text': <Input placeholder={filter.placeHolder} className="w-[250px] h-9"
          onChange={(event) =>
            table.getColumn(filter.name).setFilterValue(event.target.value)
          }
        />,
        'select': <SelectFilter column={table.getColumn(filter.name)} title={filter.placeHolder} items={filter.items} />
      }[filter.type]}
    </>
  )
}

export default function FilterInput({ table, filters }) {

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {
          filters.map((filter, index) => {
            return (
              <AutoFilter key={index} table={table} filter={filter} />
            )
          })
        }
      </div>
    </div>
  );
}






{/* function sdfsdf({ table, columns, filters }) {

  const [filterableColumns] = columns.filter(column => column.canFilter);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filtrer par ${filterableColumns.header || ''}...`}

          onChange={(event) =>
            table.getColumn(filterableColumns.accessorKey).setFilterValue(event.target.value)
          }
          className="max-w-sm h-9"
        />


        <SelectFilter column={table.getColumn("status")} title={'Status'} items={[]} />


      </div>
    </div>
  );
} */}