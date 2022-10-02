import React from 'react';
import styled from 'styled-components';


const Inputs = styled.input`

    border-radius : 3px;
    width : ${props => props.styled.width};
    margin : ${props => props.styled.margin};
    padding : ${props => props.styled.padding};  
`

export const Input = ({ styled, onChange, values, name, placeholder }) => { //외부에 동작을 위임하는 Input 컴포넌트 작성

    return(
        <Inputs name={name} value={values} onChange={onChange} styled={styled} placeholder={placeholder} />
    )
}