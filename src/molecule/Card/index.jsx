import React from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import Title from '../../atoms/Title';



const Cards = styled.div`
    border : 1px solid #fff;
    border-radius : 8px;
    overflow : hidden;
    height : 100%;
    width : 100%;
    max-width : 200px;
    > div {
        text-align : center;
    }
    > img {
        width : 100%;
        height : 88%;
    }
    &:hover {
        transform : translateY(-4px);
        cursor : pointer;
    }
`




const Card = ( { imgsrc, styled, title, subtitle }) => {


    return(
        <Cards styled={styled}>
            <img src={imgsrc} alt="이미지" />
            <Title styled={{fontSize : '12px'}}>{title}</Title>
            <Text styled={{fontSize : '12px', color : 'gray'}}>{subtitle}</Text>
        </Cards>
    )
}


export default React.memo(Card);