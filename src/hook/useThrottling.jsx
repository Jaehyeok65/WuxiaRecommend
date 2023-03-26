import { useEffect, useRef, useState } from 'react';

const useThrottling = (delay = 3000) => {
  const [scrollY, setScrollY] = useState(0);
  const timerRef = useRef(null);

  const throttling = () => {
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        setScrollY(() => window.scrollY);
        timerRef.current = null;
      }, delay);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', throttling);

    return () => {
      window.removeEventListener('scroll', throttling);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return scrollY;
};

export default useThrottling;
