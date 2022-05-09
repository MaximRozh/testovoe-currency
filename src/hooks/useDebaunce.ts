import { useCallback, useRef } from "react";

interface Debaunce {
  current: number | null;
}

export const useDebaunce = (callback: any, delay: number): any => {
  const timer: Debaunce = useRef(null);

  const debauncedCallback = useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay) as unknown as number;
    },
    [callback, delay]
  );
  return debauncedCallback;
};
