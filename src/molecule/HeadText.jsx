import React from 'react';
import styled from 'styled-components';
import Icon from '../atoms/Icon';
import { Text } from '../atoms/Text';
import { FaBars } from 'react-icons/fa';
import Button from '../atoms/Button';
import { AiOutlineMedium } from "react-icons/ai";

const HeadTexts = styled.div`
    display : flex;
    width : 60%;
    justify-content : space-between;
`;

const Container = styled.div`
    display : flex;
    align-items : center;
`



const HeadText = ( { styled, onClicks }) => {


    const Iconstyle = {...styled.icon};
    const Textstyle = {...styled.text};
    const btnstyle = {...styled.btn};

    return(
        <HeadTexts>
            <Button onClicks={onClicks} styled={btnstyle}>
                <Icon styled={{fontSize : '30px'}}><FaBars /></Icon>
            </Button>
            <Container>
                <Icon styled={Iconstyle}><AiOutlineMedium /></Icon>
                <Text styled={Textstyle}>무협광</Text>
            </Container>
        </HeadTexts>
    )
}

export default HeadText;