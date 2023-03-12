import React, { useState, useEffect } from 'react';
import { getCommentList } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { handleScroll } from '../List';
import { LoginModal } from '../../redux/reducers/modal';
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
    const selectList = ['최신순', '추천순'];

    useEffect(() => {
        dispatch(getCommentList(Selected)); //게시글 리스트를 가져오는 redux-thunk 함수
    }, [dispatch, Selected]); //Selected가 변경될 때마다 dispatch 수행 == 이미 data가 존재하면 불필요한 dispatch방지

    useEffect(() => {
        handleScroll();
    }, [page]);

    const LoginToggle = (data) => dispatch(LoginModal(data));

    const handleSelect = (e) => {
        setSelected(e.target.value);
        setPage(1); //페이지를 1페이지로 바꿈
    };

    const isLoginToggle = () => {
        window.alert('로그인이 필요한 기능입니다.');
        LoginToggle(true);
    };

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
