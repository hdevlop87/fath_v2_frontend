import * as React from "react"

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

interface ItemObject {
   label: string;
   value: any;
}

export default function SelectFilter({ column, title, items }) {

   const handleValueChange = (newValue) => {
      column?.setFilterValue(newValue)
   }
   return (
      <Select onValueChange={handleValueChange}>
         <SelectTrigger className="w-full gap-1">
            <SelectValue placeholder={title} />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               {
                  (items as ItemObject[]).map((item: ItemObject) => (
                     <SelectItem key={item?.value} value={item?.value}>
                        {item?.label}
                     </SelectItem>
                  ))
               }
            </SelectGroup>
         </SelectContent>
      </Select>
   )
}