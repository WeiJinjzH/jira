import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

// 在没有用到其它hook的时候，就写成一个函数，用到其它hook的时候，就写成一个自定义hook
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncevalue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncevalue(value), delay);
    return () => clearTimeout(timeOut);
  }, [value, delay]);
  return debouncedValue;
};
