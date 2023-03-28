import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../redux/action';
import { StarSubmit, LikeSubmit } from '../../redux/action';
import { SubmitView } from '../../api/WuxiaAPI';
import { useNavigate } from 'react-router-dom';
import { setRecentView } from '../../module/RecentView';
import Detail from '.';

const Container = ({ loginstate }) => {
    const { title } = useParams();
    const [ratetoggle, setRateToggle] = useState(false); //별점용 토글
    const [handleclicked, setHandleClicked] = useState([
        false,
        false,
        false,
        false,
        false,
    ]); //별점부여용 State
    const [clicked, setClicked] = useState([false, false, false, false, false]); //상품 별점 State
    const [view, setView] = useState(false);
    const { data, loading, error } = useSelector(
        (state) => state.wuxia.product[title]
    ) || {
        data: null,
        loading: false,
        error: null,
    };
    const dispatch = useDispatch();
    const memoizedDispatch = useCallback(dispatch, []);
    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    useEffect(() => {
        if (data) {
            setRecentView(data);
            return;
        }
        memoizedDispatch(getProduct(title));
    }, [title, memoizedDispatch, data]);

    useEffect(() => {
        if (!view && data) { //중복 방문을 방지하기 위함
            SubmitView(data);
            setView(true);
        }
        if(data) { //data가 변경될 때 별점도 변경하기 위함
            handleStar(data.rate-1);
            init();
        }
    }, [data, view]);

    const handleStar = useCallback((index) => {
        setHandleClicked((prev) => prev.map((_, i) => i <= index));
    }, []);

    const handleClose = useCallback(() => {
        setRateToggle((prev) => !prev);
    }, []);

    const handleSubmit = useCallback(async() => {
        const rate = handleclicked.filter((item) => item === true).length;
        await memoizedDispatch(
            StarSubmit(title, rate, data, () => setRateToggle((prev) => !prev))
        );
    }, [handleclicked, memoizedDispatch, setRateToggle, title, data]);


    const handleRate = useCallback((rate) => {
        setClicked(
            Array(5)
                .fill(false)
                .map((_, i) => i < rate)
        );
    }, []);

    const onLikeClick = useCallback(async () => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }
        memoizedDispatch(LikeSubmit(title, data));
    }, [title, data]);

    const onRateToggle = useCallback(() => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }
        setRateToggle((prev) => !prev);
    }, [setRateToggle]);

    const init = () => {
        setClicked(() => {
            const clickStates = Array(5)
                .fill(false)
                .map((_, index) => index < data.rate);
            return clickStates;
        });
    };

    //console.log(window.sessionStorage.getItem('view'));

    return (
        <React.Fragment>
            <Detail
                data={data}
                error={error}
                ratetoggle={ratetoggle}
                handleStar={handleStar}
                handleSubmit={handleSubmit}
                handleClose={handleClose}
                handleRate={handleRate}
                onLikeClick={onLikeClick}
                onRateToggle={onRateToggle}
                init={init}
                clicked={clicked}
                handleclicked={handleclicked}
            />
        </React.Fragment>
    );
};

export default React.memo(Container);
