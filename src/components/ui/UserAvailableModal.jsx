
import React, { useEffect } from 'react'
import axios from "../../api/axiosInstace"

export default function UserAvailableModal({ name, url }) {


    return (
        <div className="flex items-center w-full justify-center">
            {url ? <img
                src={`${url}`} atl={`${name} profile pic.`}
                className="w-16  h-16 bg-white rounded-full object-cove "
            /> :''}
            <p className="border-2 w-[200px] text-center border-gray-200 hover:bg-green-400 hover:text-white px-5 text-sm py-2 rounded-xl"> {name} </p>
        </div>
    )
}
