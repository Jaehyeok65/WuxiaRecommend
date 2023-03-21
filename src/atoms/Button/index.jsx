import React from 'react';
import styled from 'styled-components';

const Buttons = styled.button`
    background: white;
    border-radius: ${(props) =>
        props.styled ? props.styled.borderRadius : '3px'};
    border: ${(props) =>
        props.styled ? props.styled.border : '1px solid gray'};
    color: ${props => props.color ? props.color : 'black'};
    padding: ${(props) => (props.styled ? props.styled.padding : '12px')};
    margin: ${(props) => (props.styled ? props.styled.margin : '0px')};
    margin-bottom: ${(props) =>
        props.styled ? props.styled.marginBottom : '0px'};
    margin-top: ${(props) => (props.styled ? props.styled.marginTop : '0px')};
    font-size: ${(props) => (props.styled ? props.styled.fontSize : '12px')};
    text-align: ${(props) =>
        props.styled ? props.styled.textAlign : 'center'};
    width: ${(props) => (props.styled ? props.styled.width : '12px')};
    &:hover {
        cursor: pointer;
    }
    display: ${(props) => (props.styled ? props.styled.display : null)};
    background-color: transparent;
    background-repeat: no-repeat;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    font-weight: ${(props => props.styled && props.styled.fontWeight)}
`;

const Button = ({ children, onClick, styled, color }) => {
    //외부에 동작을 위임하는 button 컴포넌트 작성

    return (
        <Buttons onClick={onClick} styled={styled} color={color}>
            {children}
        </Buttons>
    );
};

export default React.memo(Button);
