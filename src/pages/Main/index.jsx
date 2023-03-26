import React, { useCallback } from 'react';
import MainFrame from '../MainFrame';
import MainCarousel from '../../organism/MainCarousel';
import MainList from '../../organism/MainList';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMain } from '../../redux/action';
import Error from '../../module/Error';
import Loading from '../../module/Loading';

const liststyle = {
    pcgrid: 'repeat(6,1fr)',
    tabletgrid: 'repeat(4,1fr)',
    mobilegrid: 'repeat(3,1fr)',
    gap: '20px 40px',
};

const Main = () => {
    const { data, loading, error } = useSelector(
        (state) => state.wuxia.main
    ) || {
        loading: false,
        data: null,
        error: null,
    };
    const dispatch = useDispatch();
    const memoizedDispatch = useCallback(dispatch, []);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 0) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }, []);

    useEffect(() => {
        handleScroll();
    }, []);

    useEffect(() => {
        if (data) return;
        memoizedDispatch(getMain());
    }, [memoizedDispatch, data]);

    if (loading && performance.timing.loadEventEnd - performance.timing.navigationStart > 1000) return <Loading />;
    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <MainFrame>
            <MainCarousel list={data[0]} />
            <MainList list={data[0]} title="조회수 TOP 12" styled={liststyle} />
            <MainList list={data[1]} title="좋아요 TOP 12" styled={liststyle} />
            <MainList list={data[2]} title="별점 TOP 12" styled={liststyle} />
        </MainFrame>
    );
};

export default React.memo(Main);
