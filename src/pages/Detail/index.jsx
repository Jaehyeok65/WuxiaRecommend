import React, { useEffect, useState } from 'react';
import MainFrame from '../MainFrame';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Product from '../../molecule/Product';
import Modal from '../../molecule/Modal';
import StarRate from '../../molecule/StarRate';
import Button from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../redux/action';
import { StarSubmit, LikeSubmit } from '../../redux/action';
import { SubmitView } from '../../api/WuxiaAPI';



const Details = styled.div`
    display : grid;
    grid-template-columns: repeat(2,1fr);
    gap : 20px 20px;
    width : 50%;
    margin : 0 auto;
    margin-top : 3%;
    margin-bottom : 10%;

    > img {
        width : 100%;
        height : 100%;
        max-width : 280px;
    }

    @media screen and (max-width: 1000px) {
        width : 80%;
        margin-bottom : 50%;
        margin-top : 20%;
    }
`;

const productstyle = {
    title : {
        marginBottom : '5%'
    },
    text : {
        marginBottom : '5%',
        fontSize : '12px'
    }
}


const Detail = ( { loginstate, setLoginToggle }) => {

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
            setLoginToggle();
            return;
        }
        dispatch(LikeSubmit(title,data));
    }

    const onRateToggle = () => {
        if(!loginstate) {
            window.alert("로그인이 필요한 기능입니다.");
            setLoginToggle();
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

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;


    return(
        <React.Fragment>
            { data && 
            <React.Fragment>
                <MainFrame>
                    <Details>
                        <Product product={data} styled={productstyle} icon={true} setIcon={onLikeClick}
                        setRateToggle={onRateToggle} setTextToggle={()=>setTextToggle(prev => !prev)}
                        clicked={clicked} init={init} />
                    </Details>
                </MainFrame>
                    <Modal toggle={ratetoggle}>
                        <Text styled={{textAlign : 'center', marginBottom : '5%', marginTop : '20%'}}>별점 주기</Text>
                        <StarRate clicked={handleclicked} handleStar={handleStar} styled={{fontSize : '30px', textAlign : 'center', color : '#FFCF36'}} />
                        <Button onClicks={handleSubmit} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block', marginBottom : '2%', marginTop : '2%'}}>적용하기</Button>
                        <Button onClicks={handleClose} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block'}}>닫기</Button>
                    </Modal>
                    <Modal toggle={texttoggle}>
                        <Text styled={{textAlign : 'center', marginBottom : '5%', marginTop : '20%', marginLeft : '5%', marginRight : '5%'}}>{data.content}</Text>
                        <Button onClicks={() => setTextToggle(prev => !prev)} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block'}}>닫기</Button>
                    </Modal>
            </React.Fragment>}
        </React.Fragment>
    )

}


export default React.memo(Detail);