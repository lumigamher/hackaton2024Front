import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Typography, Button } from '@mui/material';

const Cronometro = () => {
  const [duracion, setDuracion] = useState(0); // Tiempo transcurrido en milisegundos
  const [isRunning, setIsRunning] = useState(false); // Estado del cronómetro
  const [stompClient, setStompClient] = useState(null); // Cliente STOMP

  useEffect(() => {
    // Conectar al WebSocket
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Conexión WebSocket exitosa");
      client.subscribe('/topic/cronometro', (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("Mensaje recibido:", receivedMessage); // Log para ver el mensaje recibido
        
        if (receivedMessage.fechaInicio) {
            console.log("Iniciando cronómetro..."); // Mensaje de inicio
            setDuracion(0); // Reinicia el cronómetro
            setIsRunning(true); // Cambia el estado a "iniciado"
        }
        
        if (receivedMessage.fechaFin) {
            console.log("Deteniendo cronómetro..."); // Mensaje de fin
            setIsRunning(false); // Cambia el estado a "detenido"
        }
    });
    
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    console.log("Estado isRunning:", isRunning); // Log para verificar si isRunning cambia

    let interval;
    if (isRunning) {
      console.log("Cronómetro está corriendo"); // Verifica que el cronómetro comienza
      interval = setInterval(() => {
        setDuracion((prevDuracion) => prevDuracion + 1000); // Incrementar en 1000 ms (1 segundo)
      }, 1000);
    }
    return () => {
      if (interval) {
        console.log("Limpiando intervalo..."); // Mensaje cuando se detiene el cronómetro o el componente se desmonta
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const iniciarCronometro = () => {
    if (stompClient && stompClient.connected) {
      const cronometro = {
        usuario: 'Usuario', // Cambia esto según sea necesario
      };
      console.log("Enviando mensaje para iniciar cronómetro..."); // Log para confirmar el envío
      stompClient.send('/app/iniciar', {}, JSON.stringify(cronometro));
    } else {
      console.log("No hay conexión WebSocket establecida");
    }
  };

  const detenerCronometro = () => {
    if (stompClient && stompClient.connected) {
      const cronometro = {
        usuario: 'Usuario',
      };
      console.log("Enviando mensaje para detener cronómetro..."); // Log para confirmar el envío
      stompClient.send('/app/detener', {}, JSON.stringify(cronometro));
    }
    setIsRunning(false); // Detener el cronómetro localmente
  };

  const calcularDuracion = () => {
    const segundos = Math.floor((duracion / 1000) % 60);
    const minutos = Math.floor((duracion / (1000 * 60)) % 60);
    const horas = Math.floor((duracion / (1000 * 60 * 60)) % 24);
    return `${horas}h ${minutos}m ${segundos}s`;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={iniciarCronometro} disabled={isRunning}>
          Iniciar Cronómetro
        </Button>
        
        <Button variant="contained" onClick={detenerCronometro} disabled={!isRunning} style={{ marginLeft: '10px' }}>
          Detener Cronómetro
        </Button>
      </div>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Tiempo transcurrido: {calcularDuracion()}
      </Typography>
    </div>
  );
};

export default Cronometro;
