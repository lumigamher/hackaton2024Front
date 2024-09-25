import React from 'react'

export const estados = {
  1: 'Asignada',
  2: 'Completada',
  3: 'En proceso'
}

function TaskCard({ task }) {
  return (
    <div className='max-w-[380px] sm:min-w-full lg:min-w-[380px] max-h-[175px] min-h-[175px] p-5 border-2 border-gray-100 flex flex-col gap-5 rounded-3xl'>
      <h2 className='text-xl font-bold'>Task</h2>
      <div className='flex justify-between'>
        <p className='text-gray-700'>{task.nombre}</p>
        <p className='text-gray-700'>{estados[task.estadoTarea]}</p>
      </div>
    </div>
  )
}

export default TaskCard
