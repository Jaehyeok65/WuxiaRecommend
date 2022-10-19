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
import { StarSubmit } from '../../redux/action';



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


const Detail = () => {

    const { title } = useParams();
    const [iconState, setIconState] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const { data, loading, error } = useSelector(state => state.wuxia.wuxia);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProduct(title));

        return () => {
            dispatch({ type : 'CLEAR'})
        }
      }, [title, dispatch]);


    const handleStar = (index) => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i <= index ? true : false;
        }
         setClicked(clickStates);
    };
       
    const handleClose = () => {
        setToggle(prev => !prev);
    }

    const handleSubmit = () => {
        const star = clicked.filter(item => item === true).length;
        dispatch(StarSubmit(title,star));
        setToggle(prev => !prev);
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
                        <Product product={data} styled={productstyle} icon={iconState} setIcon={()=>setIconState(prev=>!prev)} setToggle={()=>setToggle(prev => !prev)} clicked={clicked} setClicked={setClicked} init={init} />
                    </Details>
                </MainFrame>
                    <Modal toggle={toggle}>
                        <Text styled={{textAlign : 'center', marginBottom : '5%', marginTop : '20%'}}>별점 주기</Text>
                        <StarRate rate={data.rate} clicked={clicked} handleStar={handleStar} styled={{fontSize : '30px', textAlign : 'center', color : '#FFCF36'}} setClicked={setClicked} />
                        <Button onClicks={handleSubmit} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block', marginBottom : '2%', marginTop : '2%'}}>적용하기</Button>
                        <Button onClicks={handleClose} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block'}}>닫기</Button>
                    </Modal>
            </React.Fragment>}
        </React.Fragment>
    )

}


export default React.memo(Detail);