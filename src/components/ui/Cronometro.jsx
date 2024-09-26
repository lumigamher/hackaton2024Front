import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import PropTypes from 'prop-types';

const Cronometro = ({ task, id, handleClick, icon = 'bx bxs-right-top-arrow-circle text-white text-lg' }) => {
  const [duracion, setDuracion] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Conectar al WebSocket
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Conexión WebSocket exitosa");
      client.subscribe(`/topic/cronometro/${task.id}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("Mensaje recibido para tarea:", task.id, receivedMessage);

        if (receivedMessage.fechaInicio) {
          console.log("Iniciando cronómetro para tarea:", task.id);
          setDuracion(0);
          setIsRunning(true);
        }

        if (receivedMessage.fechaFin) {
          console.log("Deteniendo cronómetro para tarea:", task.id);
          setIsRunning(false);
        }
      });
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [task.id]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setDuracion((prevDuracion) => prevDuracion + 1000);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const iniciarCronometro = () => {
    if (stompClient && stompClient.connected) {
      const cronometro = {
        usuario: 'Usuario',
        taskId: task.id // Asociar la tarea con el mensaje
      };
      stompClient.send('/app/iniciar', {}, JSON.stringify(cronometro));
    }
  };

  const detenerCronometro = () => {
    if (stompClient && stompClient.connected) {
      const cronometro = {
        usuario: 'Usuario',
        taskId: task.id // Asociar la tarea con el mensaje
      };
      stompClient.send('/app/detener', {}, JSON.stringify(cronometro));
    }
    setIsRunning(false);
  };

  const calcularDuracion = () => {
    const segundos = Math.floor((duracion / 1000) % 60);
    const minutos = Math.floor((duracion / (1000 * 60)) % 60);
    const horas = Math.floor((duracion / (1000 * 60 * 60)) % 24);
    return `${horas}h ${minutos}m ${segundos}s`;
  };

  return (
    <div className='relative w-[175px] h-[175px] select-none p-5 bg-gradient-to-br from-orange-200 via-yellow-300 to-orange-400 shadow-lg flex flex-col justify-between items-center rounded-2xl'>
      {/* Ícono de la esquina superior derecha */}
      <div className='absolute top-2 right-2'>
        <button className='text-xs text-gray-600'>
          <i id={id} onClick={handleClick} className={`text-gray-400 ml-2 text-2xl bx ${icon}`} />
        </button>
      </div>

      {/* Título de la tarea */}
      <h2 className='text-sm font-semibold text-gray-800 self-start'>{task.nombre}</h2>

      {/* Cronómetro */}
      <div className='text-2xl font-mono text-gray-800'>
        {calcularDuracion()}
      </div>

      {/* Botones: Start y Pausa */}
      <div className='flex items-center space-x-2 self-start'>
        <button
          className='px-4 py-2 bg-white text-yellow-600 rounded-full shadow-md'
          onClick={iniciarCronometro}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className='px-4 py-2 bg-white text-yellow-600 rounded-full shadow-md'
          onClick={detenerCronometro}
          disabled={!isRunning}
        >
          Pausar
        </button>
      </div>
    </div>
  );
};

Cronometro.propTypes = {
  task: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    cronometro: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Cronometro;
