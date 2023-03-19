import { useEffect } from "react";

export function useTick(cb: () => void) {
  useEffect(() => {
    let intervalId = setInterval(() => {
      cb();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
}
