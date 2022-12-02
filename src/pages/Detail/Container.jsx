import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../redux/action';
import { StarSubmit, LikeSubmit } from '../../redux/action';
import { SubmitView } from '../../api/WuxiaAPI';
import { LoginModal } from '../../redux/reducers/modal';
import Detail from '.';


const Container = ( { loginstate }) => {

    const { title } = useParams();
    const [ratetoggle, setRateToggle] = useState(false); //별점용 토글
    const [texttoggle, setTextToggle] = useState(false); //본문용 토글
    const [clicked, setClicked] = useState([false, false, false, false, false]); //Product용 별점
    const [handleclicked, setHandleClicked] = useState([false, false, false, false, false]); //별점부여용 별점
    const [view, setView] = useState(false);
    const { data, loading, error } = useSelector(state => state.wuxia.product[title]) || {
        data : null,
        loading : false,
        error : null
    };
    const dispatch = useDispatch();


    useEffect(() => {
        if(data) return;
        dispatch(getProduct(title));
      }, [title, dispatch, data]);

      
    useEffect(() => {
        if(!view && data) {
            SubmitView(data);
            setView(true);
        }
      },[data,view])

    const LoginToggle = (data) => dispatch(LoginModal(data));

    const handleStar = (index) => {
        let clickStates = [...handleclicked];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i <= index ? true : false;
        }
         setHandleClicked(clickStates);
    };
       
    const handleClose = () => {
        setRateToggle(prev => !prev);
    }

    const handleSubmit = () => {
        const star = handleclicked.filter(item => item === true).length;
        const rate = StarRateUpdate(star);
        dispatch(StarSubmit(title,rate,data, () => setRateToggle(prev => !prev))); //콜백함수로 SetToggle 전달
        handleRate(rate);
    }

    const StarRateUpdate = (star) => {
        const ratesum = (Number)(data.rate * data.people);
        const rate = (Number)((Number)(ratesum + star) / Number(data.people + 1)).toFixed(1);
        return rate;
    }

    const handleRate = (rate) => {
        let clickStates = [false,false,false,false,false];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i < rate ? true : false;
        }
        setClicked(clickStates);
    }

    const onLikeClick = async() => {
        if(!loginstate) {
            window.alert("로그인이 필요한 기능입니다.");
            LoginToggle(true);
            return;
        }
        dispatch(LikeSubmit(title,data));
    }

    const onRateToggle = () => {
        if(!loginstate) {
            window.alert("로그인이 필요한 기능입니다.");
            LoginToggle(true);
            return;
        }
        setRateToggle(prev => !prev);
    }
    
    const init = () => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i < data.rate ? true : false;
        }
         setClicked(clickStates);
    };



    return(
        <React.Fragment>
            <Detail data={data} error={error} ratetoggle={ratetoggle} texttoggle={texttoggle} setTextToggle={setTextToggle}
                handleStar={handleStar} handleSubmit={handleSubmit} handleClose={handleClose} handleRate={handleRate} 
                onLikeClick={onLikeClick} onRateToggle={onRateToggle} init={init}
            />
        </React.Fragment>
    )
}

export default React.memo(Container);