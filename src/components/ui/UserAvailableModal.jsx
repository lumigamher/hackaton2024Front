
import React, { useEffect, useState } from 'react'
import axios from "../../api/axiosInstace"

export default function UserAvailableModal({ name, url, handleClick, id, selected = false }) {
    const [isSelected, setIsSelected] = useState(selected)

    const handleSelection = () => {
        const newSelection = !isSelected
        setIsSelected(newSelection)
        // console.log(newSelection);
        handleClick(id, newSelection)
    }
    
    return (
        <div className="flex items-center w-full justify-center">
            {url ? <img
                src={`${url}`} atl={`${name} profile pic.`}
                className="w-16  h-16 bg-white rounded-full object-cove "
            /> :''}
            <p className={`border-2 w-[200px] text-center border-gray-200 hover:bg-green-400 ${isSelected? "bg-green-500 " : ''} hover:text-white px-5 text-sm py-2 rounded-xl`} onClick={handleSelection} id={id}> {name} </p>
        </div>
    )
}
