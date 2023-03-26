import React, { useState, useEffect, useCallback } from 'react';
import { getCommentList } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Community from '.';

const Container = ({ loginstate }) => {
    const [Selected, setSelected] = useState('최신순');

    const { data, loading, error } = useSelector(
        (state) => state.comment.commentlist[Selected]
    ) || {
        loading: false,
        data: null,
        error: null,
    };

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const dispatch = useDispatch();
    const memoizedDispatch = useCallback(dispatch, []);
    const selectList = ['최신순', '추천순'];
    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    useEffect(() => {
        memoizedDispatch(getCommentList(Selected)); //게시글 리스트를 가져오는 redux-thunk 함수
    }, [memoizedDispatch, Selected]); //Selected가 변경될 때마다 dispatch 수행 == 이미 data가 존재하면 불필요한 dispatch방지

    useEffect(() => {
        handleScroll();
    }, [page]);

    const handleSelect = useCallback((e) => {
        setSelected(e.target.value);
        setPage(1); //페이지를 1페이지로 바꿈
    }, []);

    const isLoginToggle = useCallback(() => {
        window.alert('로그인이 필요한 기능입니다.');
        memoizedNavigate('/login');
    }, []);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, []);

    return (
        <React.Fragment>
            <Community
                data={data}
                loading={loading}
                error={error}
                loginstate={loginstate}
                isLoginToggle={isLoginToggle}
                handleSelect={handleSelect}
                limit={limit}
                setLimit={setLimit}
                offset={offset}
                page={page}
                setPage={setPage}
                Selected={Selected}
                selectList={selectList}
            />
        </React.Fragment>
    );
};

export default React.memo(Container);
