import React, { useEffect, useState, useRef, useCallback } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../../redux/action';
import { getTotal } from '../../api/WuxiaAPI';
import { FaArrowUp } from 'react-icons/fa';
import Loading from '../../module/Loading';
import Error from '../../module/Error';
import ListView from '../../module/ListView';
import useThrottling from '../../hook/useThrottling';

const Btn = styled.button`
    position: fixed;
    border: none;
    text-align: center;
    z-index: 9999999;
    background-color: white;
    &:hover {
        transform: translateY(-4px);
        cursor: pointer;
    }
    @media screen and (max-width: 2000px) {
        right: 20px;
        bottom: 50%;
        font-size: 22px;
    }
    @media screen and (max-width: 800px) {
        bottom: 20px;
        right: 50%;
        font-size: 16px;
    }
`;

const cardstyle = {
    height: '100%',
    mobileheight: '100%',
};

const cardinfostyle = {
    title: {
        marginBottom: '5%',
        fontSize: '14px',
    },
    subtext: {
        marginBottom: '5%',
        fontSize: '12px',
        color: 'gray',
    },
    icon: {
        fontSize: '15px',
        color: 'red',
    },
    span: {
        fontSize: '14px',
        verticalAlign: 'top',
        marginLeft: '8px',
    },
    text: {
        fontSize: '12px',
        marginTop: '5%',
    },
};

const List = () => {
    const { title } = useParams(); //title에 맞게 서버에 데이터 요청할 것
    const callbacktitle = useRef(title); //ObserverAPI title 참조용 ref
    const { data, loading, error } = useSelector(
        (state) => state.wuxia.list[title]
    ) || {
        loading: false,
        data: null,
        error: null,
    };
    const page = useRef(
        useSelector((state) => state.wuxia.page) || {
            조회순: 1,
            별점순: 1,
            좋아요순: 1,
        }
    );

    console.log("렌더링 되냐");

    const scroll = useThrottling();
    const limit = 12;

    const total = useRef(0);
    const [bottom, setBottom] = useState(null);
    const dispatch = useDispatch();
    const memoizedDispatch = useCallback(dispatch, []);

    const observerCallback = useCallback(
        ([entries]) => {
            if (
                entries.isIntersecting &&
                page.current[callbacktitle.current] * limit < total.current
            ) {
                page.current[callbacktitle.current] += 1;
                memoizedDispatch(getPage(callbacktitle.current, page.current));
                memoizedDispatch({
                    type: 'PAGE',
                    data: page.current[callbacktitle.current],
                    title: callbacktitle.current,
                });
            }
        },
        [memoizedDispatch, limit]
    );

    const option = { threshold: 0.25, rootMargin: '80px' };

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, option);
        if (bottom) {
            observer.observe(bottom);
        }
        return () => {
            if (bottom) {
                observer.unobserve(bottom);
            }
        };
    }, [bottom]);

    useEffect(() => {
        //쓰로틀링 훅으로 스크롤 위치 저장함
        window.sessionStorage.setItem(
            `${callbacktitle.current}_scroll`,
            scroll
        );
    }, [scroll]);

    const getTotals = useCallback(async () => {
        try {
          const data = await getTotal();
          total.current = data;
        } catch (error) {
          console.error(error);
        }
      }, []);

    const handleScroll = useCallback((title) => {
        window.scrollTo({
            top: window.sessionStorage.getItem(`${title}_scroll`),
        });
    }, []);

    useEffect(() => {
        callbacktitle.current = title; // ObserverAPI가 title 참조 최신화를 못하므로 ref로 title값 관리
        handleScroll(callbacktitle.current);
        getTotals();
    }, [title]);

    useEffect(() => {
        //메뉴 전용
        if (data) return;
        memoizedDispatch(getPage(title, page.current)); //초기에 데이터를 가져오기 위함
    }, [memoizedDispatch, title, data]);

    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <MainFrame>
            <h2 id={'viewPort'} style={{ fontSize: '20px', marginTop: '2%' }}>
                {title}
            </h2>
            <ListView
                data={data}
                cardstyle={cardstyle}
                cardinfostyle={cardinfostyle}
            />
            <div ref={setBottom} />
            {loading && <Loading height="5%" width="3%" marginBottom="5%" />}
            <Btn onClick={handleScroll}>
                <FaArrowUp />
            </Btn>
        </MainFrame>
    );
};

export default React.memo(List);
