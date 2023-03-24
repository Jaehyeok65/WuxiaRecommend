import { useEffect, useState } from 'react';

const useThrottling = (delay = 3000) => {
    const [scrollY, setScrollY] = useState(0); //초기 스크롤 위치는 0

    //쓰로틀링의 원리 == 일정주기마다 최대 한 번의 요청만을 처리한다.
    let timer;

    const throttling = () => {
        if (!timer) {
            timer = setTimeout(() => {
                setScrollY(() => window.scrollY);
                timer = undefined;
            }, delay);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', throttling);

        return () => {
            window.removeEventListener('scroll', throttling);
        };
    }, []);

    return scrollY;
};

export default useThrottling;
