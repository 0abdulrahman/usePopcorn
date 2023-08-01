import { useEffect } from "react";

export function useKey(key, actionFunction) {
  useEffect(() => {
    function callBack(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) actionFunction();
    }
    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [key, actionFunction]);
}
