import { useState, useEffect } from 'react';
import { useGlobalStore } from './useGlobalStore';

export interface UseFetchGetResult<T> {
  result: T | undefined;
  setResult: React.Dispatch<React.SetStateAction<T | undefined>>;
  isPending: boolean;
  error: string | null;
  httpResponse: number | null;
}

const useFetchGet = <T = unknown>(url: string): UseFetchGetResult<T> => {
  const [result, setResult] = useState<T>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [httpResponse, setHttpResponse] = useState<number | null>(null);

  const { fetchGet } = useGlobalStore();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async (signal: AbortSignal) => {
      try {
        setIsPending(true);
        setError(null);

        const response = await fetch(url, { signal });
        setHttpResponse(response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = await response.json();
        setResult(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        } else {
          setError('Wystąpił nieznany błąd');
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData(abortController.signal);

    return () => abortController.abort();
  }, [url, fetchGet]);

  return { result, setResult, isPending, error, httpResponse };
};

export default useFetchGet;