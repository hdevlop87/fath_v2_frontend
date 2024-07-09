"use client"

import { Input } from "@/components/ui/input";
import SelectFilter from './SelectFilter'
import { useTranslations } from '@/hooks/useTranslations';

const AutoFilter = ({ table, filter }) => {
  const t = useTranslations();
  const placeholder = t(filter.placeHolder);

  const items = filter.items?.map(item => ({
    ...item,
    label: t(item.label)
  }));

  return (
    <>
      {{
        'text': <Input placeholder={placeholder} className="w-[150px] h-9 border-gray-300"
          onChange={(event) =>
            table.getColumn(filter.name).setFilterValue(event.target.value)
          }
        />,
        'select': <SelectFilter column={table.getColumn(filter.name)} title={placeholder} items={items} />
      }[filter.type]}
    </>
  )
}

export default function FilterInput({ table, filters }) {

  return (
    <div className="flex items-center justify-between gap-2">

      {
        filters.map((filter, index) => {
          return (
            <AutoFilter key={index} table={table} filter={filter} />
          )
        })
      }

    </div>
  );
}





