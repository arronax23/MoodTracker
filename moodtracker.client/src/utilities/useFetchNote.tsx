import { useState, useEffect } from 'react';
import { useGlobalStore } from './useGlobalStore';
import { Note } from '../types/note';

interface UseFetchNoteResult {
  note: Note | null;
  isPending: boolean;
  error: string | null;
  httpResponse: number | null;
}

const useFetchNote = (date: string): UseFetchNoteResult => {
  const [note, setNote] = useState<Note | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [httpResponse, setHttpResponse] = useState<number | null>(null);

  const { updatedNoteDate, setUpdatedNoteDate } = useGlobalStore(); 

  const fetchData = async (signal: AbortSignal) => {
    try {
      const response = await fetch(`/api/Notes/GetNote/${date}`, { signal });
      setHttpResponse(response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Note = await response.json();
      console.log(data);
      setNote(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } else {
        setError('Wystąpił nieznany błąd');
      }
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    setIsPending(true);
    fetchData(abortController.signal);

    return () => abortController.abort();
  }, [date]);

  useEffect(() => {
    if (updatedNoteDate !== date) return;

    const abortController = new AbortController();

    const run = async () => {
      await fetchData(abortController.signal);
      setUpdatedNoteDate(null);
    };

    run();

    return () => abortController.abort();
  }, [updatedNoteDate, date, setUpdatedNoteDate]);

  return { note, isPending, error, httpResponse };
};

export default useFetchNote;