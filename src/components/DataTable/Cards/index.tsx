
'use client';

import React from 'react';
import useKeyboardShortcuts from '@/hooks/useKeyboardShortcuts';
import CardBase from '@/components/Cards/CardBase';

const Cards = ({ table, AddButton, target }) => {

   const items = table.getRowModel().rows.map(row => row.original);
   useKeyboardShortcuts(items);

   return (
      <div className='flex flex-col w-full'>
         <div className='flex flex-wrap gap-6 overflow-auto ' >
            {
               items.map((item,index) => {

                  return (
                     <CardBase
                        key={index}
                        item={item}
                        target={target}
                     />
                  );
               })
            }
            {AddButton && <AddButton />}
         </div>
      </div>
   );
}

export default Cards;
