import React from 'react'

function AssignedTask({taskName}) {
    return (
        <div className="flex justify-between px-5 py-3 items-center border-2 border-gray-200 rounded-2xl">
            <p className=""> {taskName }</p>
            <div className="flex justify-around gap-10">
                <i className='text-gray-400 hover:scale-125 cursor-pointer duration-300 bx bxs-edit-alt'></i>
                <i className='text-gray-400 hover:scale-125 cursor-pointer duration-300 bx bxs-trash-alt' ></i>
            </div>
        </div>
    )
}

export default AssignedTask
