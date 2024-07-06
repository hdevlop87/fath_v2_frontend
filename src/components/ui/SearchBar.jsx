import React from 'react'
import { Icon } from '@iconify/react';

const SearchBar = () => {
    return (
        <div className="flex justify-start items-center border w-[300px] h-8 relative gap-2 px-4 py-2.5 rounded-xl bg-card">
            <Icon icon='bx:search-alt' width={20} />

            <p className=" text-sm text-center text-light-primary">
                Search here...
            </p>
        </div>
    )
}

export default SearchBar