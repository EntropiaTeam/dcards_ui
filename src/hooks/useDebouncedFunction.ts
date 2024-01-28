/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

const useDebouncedFunction = (
  func: (...args: any[]) => void, delay: number
): (...args: any[]
  ) => void => {
  const ref = useRef(0);

  return (...args: any[]) => {
    clearTimeout(ref.current);
    ref.current = Number(setTimeout(() => func(...args), delay));
  };
};

export default useDebouncedFunction;
