import { useRef, useEffect } from 'react';

export default function useTimeout(callback, delay) {
  const savedCallback = useRef(callback);
  const timeoutId = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleTimeout = () => {
      savedCallback.current();
    };

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(handleTimeout, delay);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [delay]);

  return () => {
    clearTimeout(timeoutId.current);
  };
}
