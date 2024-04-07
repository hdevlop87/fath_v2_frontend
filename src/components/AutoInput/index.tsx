"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { CalendarIcon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import delay from 'delay';

interface ItemObject {
   label: string;
   value: any;
}

interface AutoInputProps {
   placeholder?: string;
   field: any;
   label?: string;
   type: 'text' | 'select' | 'date' | 'checkbox' | 'radio-group' | 'textarea' | 'number' | 'combobox' | 'file' | 'switch'| 'password';


   items?: Array<ItemObject>;
   className?: string;
}

interface TextInputProps {
   placeholder?: string;
   field: any;
   type?: "text" | "password";
   [x: string]: any;
}

interface ComboboxInputProps {
   items: Array<{ value: string; label: string }>;
   placeholder?: string;
   field: any;
}

interface FileInputProps {
   field: any;
   label?: string;
}

interface ItemObject {
   value: any;
   label: string;
}

type ItemsType = Array<ItemObject> | Array<string>;

const SwitchInput = ({ field, placeholder, label }) => {

   return (
      <div className="flex gap-4 mt-[16px] " >
         <Label className="text-sm font-medium">
            {placeholder}
         </Label>
         <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
         />
      </div >
   )
}

const FileInput: React.FC<FileInputProps> = ({ field, ...props }) => {

   return (
      <div className="flex flex-col gap-1">
         <Input
            type="file"
            onChange={(e) => field.onChange(e.target.files?.[0])}
            className="border rounded"
            {...props}
         />
      </div>
   )
};

const ComboboxInput: React.FC<ComboboxInputProps> = ({ placeholder, field, items }) => {
   const [open, setOpen] = React.useState(false);

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-full justify-between"
            >
               <Label className={`${field.value ? 'text-black' : 'text-gray-300'} font-normal`}>
                  {field.value
                     ? items.find(
                        (item) => item.value === field.value
                     )?.label
                     : "Select language"}
               </Label>
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>

         <PopoverContent className="w-auto p-0">
            <Command>
               <CommandInput placeholder={`Search ${placeholder}...`} className="h-9" />
               <CommandEmpty>No items found.</CommandEmpty>
               <CommandGroup>
                  {items.map((item) => (
                     <CommandItem
                        key={item.value}
                        onSelect={(currentValue) => {
                           field.onChange(item.value);
                           setOpen(false);
                        }}
                     >
                        {item.label}
                        <Check
                           className={cn(
                              "ml-auto h-4 w-4",
                              field.value === item.value ? "opacity-100" : "opacity-0"
                           )}
                        />
                     </CommandItem>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   );
};

const NumberInput: React.FC<TextInputProps> = ({ placeholder, field, ...props }) => {
   return (
      <div className="relative">
         <Input
            type="number"
            placeholder={placeholder}
            {...field}
            {...props}
         />
      </div>
   );
};

const TextInput: React.FC<TextInputProps> = ({ placeholder, field, type = "text", ...props }) => {
   const [showPassword, setShowPassword] = React.useState(false);

   return (
      <div className="relative">
         <Input
            type={type === "password" && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            {...field}
            {...props}
            autoComplete={type === "password" ? "current-password" : "off"}
         />
         {type === "password" && (
            <div
               className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
               onClick={() => setShowPassword(!showPassword)}
            >
               {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </div>
         )}
      </div>
   );
};

const SelectInput = ({ placeholder, field, items = [] }: {
   placeholder?: string;
   field: any;
   items?: ItemsType;
}) => {
   const [selectedLabel, setSelectedLabel] = useState('');

   const renderItems = () => {
      if (items.length === 0) return null;
      if (typeof items[0] === 'string') {
         return (items as string[]).map((item, index) => (
            <SelectItem key={index} value={item}>
               {item}
            </SelectItem>
         ));
      } else {
         return (items as ItemObject[]).map((item: ItemObject) => (
            <SelectItem key={item?.value} value={item?.value}>
               {item?.label}
            </SelectItem>
         ));
      }
   };

   const handleValueChange = (newValue) => {
      field.onChange(newValue);

      const foundItem = (items as ItemObject[]).find(item => item.value === newValue);
      if (foundItem) {
         setSelectedLabel(foundItem.label);
      }
   }

   return ( 
      
      <Select onValueChange={handleValueChange} defaultValue={field.value}>
         <SelectTrigger>
            <Label className={`${field.value ? 'text-black' : 'text-gray-300'} font-normal`}>
               {selectedLabel || field.value || placeholder}
            </Label>
         </SelectTrigger>
         <SelectContent className='max-h-[300px] overflow-y-auto'>{renderItems()}</SelectContent>
      </Select>
   );
};

const DateInput = ({ placeholder, field }) => {

   const [calendarOpen, setCalendarOpen] = useState(false);

   let dateValue = field.value;
   if (typeof dateValue === "string") {
      dateValue = new Date(dateValue);
   }
   const isDateValid = dateValue instanceof Date && !isNaN(dateValue.getTime());

   return (
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
         <PopoverTrigger asChild>
            <Button
               variant={"outline"}
               className={cn("h-9 pl-3 text-left font-normal", !isDateValid && "text-muted-foreground")}
            >
               {isDateValid ? (format(dateValue, "PPP")) : (placeholder)}
               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
         </PopoverTrigger>

         <PopoverContent align="start" className=" w-auto p-0">
            <Calendar
               mode="single"
               captionLayout="dropdown-buttons"
               selected={dateValue}
               onSelect={(newDate) => {
                  field.onChange(newDate);
                  setCalendarOpen(false);
                }}
               fromYear={1940}
               toYear={2040}
            />
         </PopoverContent>
      </Popover>
   );
};

const CheckboxInput = ({ field, label }) => (
   <div className="flex gap-2 mt-[1px]">
      <Checkbox
         checked={field.value}
         onCheckedChange={field.onChange}
      />
      <label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
         {label}
      </label>
   </div>
);

const RadioGroupInput = ({ field, items, className }) => (
   <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      className={cn("flex flex-col ", className)}
   >
      {items.map((item: any) => (
         <div key={item.value} className="flex items-center space-x-3 space-y-0">
            <RadioGroupItem value={item.value} />
            <Label className="text-sm font-normal peer-disabled:opacity-70">{item.label}</Label>
         </div>
      ))}
   </RadioGroup>
);

const TextareaInput = ({ placeholder, field }) => (
   <Textarea
      placeholder={placeholder}
      className="resize-none"
      {...field}
   />
);


const AutoInput: React.FC<AutoInputProps> = ({ placeholder, field, label, type, items, className = '' }) => (
   <div className={cn('flex flex-col gap-1', className)}>
      {type !== ('checkbox' || 'switch') && label && <Label className='text-sm font-medium'>{label}</Label>}
      {{
         'text': <TextInput placeholder={placeholder} field={field} />,
         'password': <TextInput placeholder={placeholder} field={field} type="password" />,
         'select': <SelectInput placeholder={placeholder} field={field} items={items} />,
         'date': <DateInput placeholder={placeholder} field={field} />,
         'checkbox': <CheckboxInput field={field} label={label} />,
         'radio-group': <RadioGroupInput field={field} items={items} className={className} />,
         'textarea': <TextareaInput placeholder={placeholder} field={field} />,
         'number': <NumberInput placeholder={placeholder} field={field} />,
         'combobox': items && <ComboboxInput placeholder={placeholder} field={field} items={items} />,
         'file': <FileInput field={field} label={label} />,
         'switch': <SwitchInput field={field} label={label} placeholder={placeholder} />

      }[type]}
   </div>
);

export default AutoInput;
