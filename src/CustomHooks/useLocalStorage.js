import { useState, useEffect } from "react";

export function useLocalStorage(intitialValue, key) {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) ?? intitialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
