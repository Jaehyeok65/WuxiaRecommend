import React, { forwardRef } from 'react';
import styled from 'styled-components';


const Inputs = styled.input`
    border-radius : 3px;
    width : ${props => props.styled ? props.styled.width : '200px'};
    margin : ${props => props.styled ? props.styled.margin : '0px'};
    padding : ${props => props.styled ? props.styled.padding : '0px'};  
`


export const Input = forwardRef(({name, values, onChange, placeholder, styled, type, auto}, ref) => {

        return  (
            <Inputs type={type} name={name} value={values} onChange={onChange} styled={styled} placeholder={placeholder} ref={ref} autoComplete={auto} />
        );
}); 
