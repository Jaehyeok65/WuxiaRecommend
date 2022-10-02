import React, {forwardRef} from 'react';
import styled from 'styled-components';


const Inputs = styled.input`
    border-radius : 3px;
    width : ${props => props.styled.width};
    margin : ${props => props.styled.margin};
    padding : ${props => props.styled.padding};  
`


export const Input = forwardRef(({name, values, onChange, placeholder, styled}, ref) => {

        return  <Inputs name={name} value={values} onChange={onChange} styled={styled} placeholder={placeholder} ref={ref} />

    });
    

 
