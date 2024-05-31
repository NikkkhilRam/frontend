import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      const headers = {
        ...(requestConfig.headers || {}),
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET",
        headers,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        let errorMessage = "Request failed!";
        if (response.status === 401) {
          errorMessage = "Unauthorized";
        } else if (response.status === 404) {
          errorMessage = "Resource not found";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      console.error("HTTP Request Error:", err);
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
