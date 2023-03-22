import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../redux/action';
import { StarSubmit, LikeSubmit } from '../../redux/action';
import { SubmitView } from '../../api/WuxiaAPI';
import { useNavigate } from 'react-router-dom';
import { setRecentView } from '../../module/RecentView'
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
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setRecentView(data);
            return;
        }
        dispatch(getProduct(title));
    }, [title, dispatch, data]);

    useEffect(() => {
        if (!view && data) {
            SubmitView(data);
            setView(true);
        }
    }, [data, view]);


    const handleStar = (index) => {
        let clickStates = [...handleclicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setHandleClicked(clickStates);
    };

    const handleClose = () => {
        setRateToggle((prev) => !prev);
    };

    const handleSubmit = () => {
        const star = handleclicked.filter((item) => item === true).length;
        const rate = StarRateUpdate(star);
        dispatch(
            StarSubmit(title, rate, data, () => setRateToggle((prev) => !prev))
        ); //콜백함수로 SetToggle 전달
        handleRate(rate);
    };

    const StarRateUpdate = (star) => {
        const ratesum = Number(data.rate * data.people);
        const rate = Number(
            Number(ratesum + star) / Number(data.people + 1)
        ).toFixed(1);
        return rate;
    };

    const handleRate = (rate) => {
        let clickStates = [false, false, false, false, false];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i < rate ? true : false;
        }
        setClicked(clickStates);
    };

    const onLikeClick = async () => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            navigate('/login');
            return;
        }
        dispatch(LikeSubmit(title, data));
    };

    const onRateToggle = () => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            navigate('/login');
            return;
        }
        setRateToggle((prev) => !prev);
    };

    const init = () => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i < data.rate ? true : false;
        }
        setClicked(clickStates);
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
