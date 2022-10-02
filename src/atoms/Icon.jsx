import React from 'react';
import { AiOutlineMedium } from "react-icons/ai";
import styled from 'styled-components';


const Icons = styled.span`

    margin : ${props => props.styled.margin};
    font-size : ${props => props.styled.fontSize};
`

const Icon = ( { styled}) => {

    return(
        <Icons styled={styled}><AiOutlineMedium /></Icons>
    )
}

export default Icon;
