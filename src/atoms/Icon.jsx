import React from 'react';
import { AiOutlineMedium } from "react-icons/ai";
import styled from 'styled-components';
import Sidebar from '../organism/Sidebar';


const Icons = styled.span`
    font-size : ${props => props.styled.fontSize};
`

const Icon = ( { styled, onClicks }) => {
    return(
        <Icons styled={styled}><AiOutlineMedium onClick={onClicks}/>
        </Icons>
    )
}

export default Icon;
