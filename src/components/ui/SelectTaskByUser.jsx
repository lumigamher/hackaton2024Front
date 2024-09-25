import React, { useState } from 'react'

function SelectTaskByUser({task, handleClick}) {

    const [isSelected, setIsSelected] = useState(false)

    const handleSelection = (e) => {
        console.log('clok');
        const newSelection = !isSelected
        setIsSelected(newSelection)
        handleClick(e, task.id)
    }


    return (
        <div className={`flex justify-between w-full px-5 py-2 border-2 ${isSelected?  'bg-green-400' : null }  border-gray-100 rounded-3xl focus:outline-none`}>
            <p >{task.nombre? task.nombre : 'Descripcion de la tarea'}</p>
            <p><i onClick={handleSelection} className='bx bx-message-square-add'></i></p>
        </div>
    )
}

export default SelectTaskByUser
