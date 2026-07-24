import { useEffect, useRef, useState, useCallback } from "react";
import { FEATURE_FLAGS } from "../constants";

interface WebSocketMessage<T = unknown> {
  event: string;
  data: T;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  sendMessage: (event: string, data: unknown) => void;
  error: Error | null;
}

export function useWebSocket(url?: string): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const socketUrl = url || (import.meta.env.VITE_WS_URL || "ws://localhost:5000");

  const connect = useCallback(() => {
    if (!FEATURE_FLAGS.ENABLE_REALTIME) return;

    try {
      const ws = new WebSocket(socketUrl);

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setLastMessage(parsed);
        } catch {
          setLastMessage({ event: "raw", data: event.data });
        }
      };

      ws.onerror = (err) => {
        setError(new Error("WebSocket connection error"));
        console.error("[useWebSocket Error]", err);
      };

      ws.onclose = () => {
        setIsConnected(false);
        // Attempt reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 5000);
      };

      wsRef.current = ws;
    } catch (err) {
      setError(err as Error);
    }
  }, [socketUrl]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((event: string, data: unknown) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event, data }));
    } else {
      console.warn("[useWebSocket] Cannot send message: socket disconnected.");
    }
  }, []);

  return { isConnected, lastMessage, sendMessage, error };
}
