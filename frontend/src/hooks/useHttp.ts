import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      headers: any = {}
    ) => {
      setLoading(true);

      try {
        if (body) {
          if (body instanceof FormData) {
            headers = {};
          } else {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
          }
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }
        setLoading(false);
        return data;
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { request, loading, error, clearError };
};
