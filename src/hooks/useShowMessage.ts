import { useState, useCallback } from 'react';

const useShowMessage = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);

    // Remove the message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, []);

  return {
    message,
    showMessage,
  };
};

export default useShowMessage;
