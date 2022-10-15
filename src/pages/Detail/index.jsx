import React, { useEffect, useState } from 'react';
import MainFrame from '../MainFrame';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Product from '../../molecule/Product';
import Modal from '../../molecule/Modal';
import StarRate from '../../molecule/StarRate';
import Button from '../../atoms/Button';
import { Text } from '../../atoms/Text';



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


const Detail = ( { list, setList }) => {

    const { title } = useParams();
    const [product, setProduct] = useState('');
    const [iconState, setIconState] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const [index, setIndex] = useState(-1);

    useEffect( () => {
        setProduct(() => list.find(item => item.title === title));
        setIndex(() => list.findIndex(item => item.title === title));
    },[]);

    useEffect( () => {
        handleView();
    },[index]);


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
        let lists = [...list];
        lists[index] = {
            ...lists[index], rate : clicked.filter(Boolean).length
        }
        setList(lists)
        setToggle(prev => !prev);
    }

    const handleView = () => {
        if(index < 0) return;
        let lists = [...list];
        lists[index] = {
            ...lists[index], view : lists[index].view+1
        };
        setList(lists);
    };

    const init = () => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i < product.rate ? true : false;
        }
         setClicked(clickStates);
    }


    return(
        <React.Fragment>
            { product && 
            <React.Fragment>
                <MainFrame>
                    <Details>
                        <Product product={product} styled={productstyle} icon={iconState} setIcon={()=>setIconState(prev=>!prev)} setToggle={()=>setToggle(prev => !prev)} clicked={clicked} setClicked={setClicked} init={init} />
                    </Details>
                </MainFrame>
                    <Modal toggle={toggle}>
                        <Text styled={{textAlign : 'center', marginBottom : '5%', marginTop : '20%'}}>별점 주기</Text>
                        <StarRate rate={product.rate} clicked={clicked} handleStar={handleStar} styled={{fontSize : '30px', textAlign : 'center', color : '#FFCF36'}} setClicked={setClicked} />
                        <Button onClicks={handleSubmit} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block', marginBottom : '2%', marginTop : '2%'}}>적용하기</Button>
                        <Button onClicks={handleClose} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block'}}>닫기</Button>
                    </Modal>
            </React.Fragment>}
        </React.Fragment>
    )

}


export default React.memo(Detail);