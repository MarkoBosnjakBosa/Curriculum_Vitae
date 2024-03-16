import { useState, useCallback } from "react";
import { get } from "../utilities/authentication";
import { validArray } from "../../utilities/validations";
import { getString } from "../utilities/i18n";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (configuration, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = configuration.url;
      let headers = { "Content-Type": "application/json", "Cache-Control": "private, max-age=0, no-cache, no-store" };
      if (configuration.authentication) {
        const { token } = get();
        headers.authentication = `Bearer ${token}`;
      }
      const response = await fetch(url, {
        method: configuration.method,
        headers,
        body: configuration.body
      });

      const data = await response.json();

      if (!response.ok) {
        const { status } = response;
        const { errors } = data;
        if (status === 400) {
          if (validArray(errors)) {
            const errorsString = errors.join(", ");
            if (url.includes("/saveContact")) setError(`${getString("cv.texts.validation")} ${errorsString}!`);
            else setError(`Check values: ${errorsString}!`);
          } else {
            setError(errors);
          }
        }
        if (status === 401) setError(errors);
      } else {
        applyData(data);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
