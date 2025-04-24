import { useEffect } from "react";

export const usePrintOnLoad = (isLoading: boolean, delay = 300) => {
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        window.print();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, delay]);
};
