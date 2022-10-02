import React from 'react';
import styled from 'styled-components';


const Buttons = styled.button`
  background: white;
  border-radius: 3px;
  border: 1px solid gray;
  color: black;
  padding : ${props => props.styled.padding};
  margin : ${props => props.styled.margin};
`;




export const Button = ({ children, onClicks, styled}) => { //외부에 동작을 위임하는 button 컴포넌트 작성

    return(
        <Buttons onClick ={onClicks} styled={styled}>
            {children}
        </Buttons>
    )
}





