import { useState, useEffect, useRef } from 'react';

interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  skip?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => Promise<void>;
  retries: number;
}

export function useApi<T>(
  url: string,
  options?: UseApiOptions
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retries, setRetries] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const MAX_RETRIES = 3;
  const INITIAL_DELAY = 100;
  const BACKOFF_MULTIPLIER = 2;

  const execute = async () => {
    if (options?.skip) return;

    setLoading(true);
    setError(null);
    abortControllerRef.current = new AbortController();

    let attempt = 0;

    while (attempt <= MAX_RETRIES) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}${url}`,
          {
            method: options?.method || 'GET',
            credentials: 'include', // Include httpOnly cookies
            headers: {
              'Content-Type': 'application/json',
              ...options?.body ? {} : {},
            },
            body: options?.body ? JSON.stringify(options.body) : undefined,
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          // Don't retry on client errors (4xx)
          if (response.status >= 400 && response.status < 500) {
            const errorData = await response.json();
            setError(errorData.error || `Error: ${response.statusText}`);
            setLoading(false);
            return;
          }

          // Retry on server errors (5xx) or 429
          if (response.status >= 500 || response.status === 429) {
            if (attempt < MAX_RETRIES) {
              const delay = INITIAL_DELAY * Math.pow(BACKOFF_MULTIPLIER, attempt);
              await new Promise(r => setTimeout(r, delay));
              attempt++;
              setRetries(attempt);
              continue;
            }
          }

          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
        setError(null);
        return;

      } catch (err: any) {
        if (err.name === 'AbortError') {
          // Request was cancelled, don't retry
          return;
        }

        if (attempt === MAX_RETRIES) {
          setError(err.message);
          setLoading(false);
          return;
        }

        const delay = INITIAL_DELAY * Math.pow(BACKOFF_MULTIPLIER, attempt);
        await new Promise(r => setTimeout(r, delay));
        attempt++;
        setRetries(attempt);
      }
    }
  };

  useEffect(() => {
    execute();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, options?.method, JSON.stringify(options?.body || {})]);

  return { data, loading, error, retry: execute, retries };
}
