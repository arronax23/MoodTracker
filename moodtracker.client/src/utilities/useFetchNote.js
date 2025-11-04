import { useState, useEffect } from 'react'
import { useGlobalStore } from './useGlobalStore';

const useFetchNote = (date) => {
  const [note, setNote] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState();
  const [httpResponse, setHttpResponse] = useState();

  const { updateNoteDate, setUpdateNoteDate } = useGlobalStore(); 

  const fetchData = async (signal) => {
    try {
      const response = await fetch(`api/Notes/GetNote/${date}`, { signal: signal });
      setHttpResponse(response.status);
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setNote(data);

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
  }, [date]);


useEffect(() => {
  if (updateNoteDate !== date) return;

  const abortController = new AbortController();

  const run = async () => {
    await fetchData(abortController.signal);
    setUpdateNoteDate(null);
  };

  run();

  return () => abortController.abort();
}, [updateNoteDate, date]);

  return { note, isPending, error, httpResponse };
};

export default useFetchNote;
