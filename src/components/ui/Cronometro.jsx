import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Typography, Button } from '@mui/material';

const Cronometro = () => {
  const [duracion, setDuracion] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 
  const [stompClient, setStompClient] = useState(null); 

  useEffect(() => {
    // Conectar al WebSocket
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Conexión WebSocket exitosa");
      client.subscribe('/topic/cronometro', (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("Mensaje recibido:", receivedMessage); 
        
        if (receivedMessage.fechaInicio) {
            console.log("Iniciando cronómetro..."); 
            setDuracion(0); 
            setIsRunning(true); 
        }
        
        if (receivedMessage.fechaFin) {
            console.log("Deteniendo cronómetro..."); 
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
  }, []);

  useEffect(() => {
    console.log("Estado isRunning:", isRunning); 

    let interval;
    if (isRunning) {
      console.log("Cronómetro está corriendo"); 
      interval = setInterval(() => {
        setDuracion((prevDuracion) => prevDuracion + 1000); 
      }, 1000);
    }
    return () => {
      if (interval) {
        console.log("Limpiando intervalo..."); 
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const iniciarCronometro = () => {
    if (stompClient && stompClient.connected) {
      const cronometro = {
        usuario: 'Usuario', 
      };
      console.log("Enviando mensaje para iniciar cronómetro..."); 
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
      console.log("Enviando mensaje para detener cronómetro..."); 
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
