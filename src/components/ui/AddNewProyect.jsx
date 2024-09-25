import React from 'react'

function AddNewProyect({ handleClick }) {
    return (
        <div onClick={handleClick} className="flex lg:h-[175px] lg:w-[175px] w-full h-[175px] flex-col justify-between duration-500 cursor-pointer hover:scale-105 rounded-2xl bg-[url('https://img.freepik.com/vector-gratis/diseno-fondo-aventura-plana_23-2149054485.jpg')] bg-center bg-cover   p-5">
            <button  className="self-end"><i className='text-white hover:scale-105 duration-300 bx cursor-default bx-message-square-add'></i></button>
            <button  className="self-start rounded-xl select-none bg-white px-3 py-2 text-sm duration-150 cursor-default">
                New Proyects
            </button>
        </div>
    )
}

export default AddNewProyect
