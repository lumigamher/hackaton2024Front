import React from 'react'

function SelectTaskByUser({task}) {
    return (
        <div className="flex justify-between w-full px-5 py-2 border-2  border-gray-100 rounded-3xl focus:outline-none">
            <p >{task.descripcion? task.descripcion : 'Descripcion de la tarea'}</p>
            <p><i className='bx bx-message-square-add'></i></p>
        </div>
    )
}

export default SelectTaskByUser
