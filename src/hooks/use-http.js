import { useState, useCallback } from 'react';

const UseHttp = (requestConfig, applyData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await fetch(requestConfig.url + '?' + new URLSearchParams(requestConfig.params),{
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? requestConfig.body : null,
        }
      );

      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const data = await response.json();
      applyData(data);

    } catch (error) {
        setError(error.message);
    }
    setLoading(false);
  }, [requestConfig, applyData ]);

  return {
      sendRequest,
      loading,
      error
  }
};

export default UseHttp;
