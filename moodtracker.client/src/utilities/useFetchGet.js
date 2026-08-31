import { useState, useEffect } from 'react'
import { useGlobalStore } from './useGlobalStore';


const useFetchGet = (url) => {
  const [result, setResult] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState();
  const [httpResponse, setHttpResponse] = useState();

  const { fetchGet } = useGlobalStore();   

  const fetchData = async (signal) => {
    try {
      setIsPending(true);
      const response = await fetch(`${url}`, { signal: signal });
      setHttpResponse(response.status);
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);
      setResult(data);

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);

    return () => abortController.abort();
  }, [url, fetchGet]);


  return { result, setResult, isPending, error, httpResponse };
};

export default useFetchGet;
