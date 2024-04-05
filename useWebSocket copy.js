import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = (apiKey) => {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    if (!apiKey) {
      console.error('API key is undefined');
      return;
    }

    const url = `wss://api.knock.app/ws/v1/websocket?&api_key=${apiKey}&vsn=2.0.0`;
    socket.current = new WebSocket(url);

    socket.current.onopen = () => console.log('WebSocket connected');
    socket.current.onerror = (error) => console.error('WebSocket error:', error);
    socket.current.onclose = () => console.log('WebSocket disconnected');

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      if (socket.current) {
        console.log('WebSocket disconnected');
        // socket.current.close();
      }
    };
  }, [apiKey]); // Reinitialize the WebSocket if the apiKey changes

  // Function to send a message
  const sendMessage = useCallback((message) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(message));
    }
  }, []);

  return { messages, sendMessage };
};

export default useWebSocket;
