import React from 'react';
import PropTypes from 'prop-types';

export const estados = {
  1: 'Asignada',
  2: 'Completada',
  3: 'En proceso'
};

function TaskCard({ task, handleClick, id, icon }) {
  console.log(task);

  return (
    <div className='relative w-[175px] h-[175px] select-none p-5 bg-gradient-to-br from-orange-200 via-yellow-300 to-orange-400 shadow-lg flex flex-col justify-between items-center rounded-2xl'>
      {/* Ícono de la esquina superior derecha */}
      <div className='absolute top-2 right-2'>
        <button className='text-xs text-gray-600'>
          <i id={id} onClick={handleClick} className={`text-gray-400 ml-2  mb- text-2xl bx ${icon}`} />
        </button>
      </div>

      {/* Título de la tarea */}
      <h2 className='text-sm font-semibold text-gray-800 self-start'>{task.nombre}</h2>

      {/* Cronómetro */}
      <div className='text-2xl font-mono text-gray-800'>
        {task.cronometro}
      </div>

      {/* Botones: Start y Pausa */}
      <div className='flex items-center space-x-2'>
        <button className='px-4 py-2 bg-white text-yellow-600 rounded-full shadow-md'>
          Start
        </button>
        <button className='px-2 py-2 bg-white text-gray-600 rounded-full shadow-md'>
          <span className="material-icons">pause</span>
        </button>
      </div>
    </div>
  );
}
TaskCard.propTypes = {
  task: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    cronometro: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default TaskCard;
