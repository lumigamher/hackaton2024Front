import React from 'react'

function AddNewProyect({ handleClick }) {
    return (
        <div className="flex h-[175px] w-[175px] flex-col justify-between rounded-2xl bg-gray-200 p-5">
            <button className="self-end"><i className=' hover:scale-105 duration-300 bx bx-message-square-add'></i></button>
            <button onClick={handleClick} className="self-start rounded-xl select-none bg-white px-3 py-2 text-sm duration-150 hover:scale-105">
                New Proyect
            </button>
        </div>
    )
}

export default AddNewProyect
