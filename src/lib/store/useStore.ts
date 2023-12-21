import { useState, useEffect } from "react";
import { useCartStore } from "./cart";

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === "cart" && event.newValue) {
        useCartStore.persist.rehydrate()
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
