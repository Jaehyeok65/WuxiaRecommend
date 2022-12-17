import React from 'react';
import styled from 'styled-components';


const Titles = styled.div`
    font-weight : bold;
    font-size : ${props => props.styled ? props.styled.fontSize : '20px'};
    margin-bottom : ${props => props.styled ? props.styled.marginBottom : '0px'};
    text-align : ${props => props.styled ? props.styled.textAlign : 'left'};
    margin-top : ${props => props.styled ? props.styled.marginTop : '0px'};
    cursor : pointer;
    color : ${props => props.styled ? props.styled.color : 'black'};
`

const Title = ( { children, styled, onClicks }) => {
    
    return(
        <Titles styled={styled} onClick={onClicks}>
            { children }
        </Titles>
    )
}


export default React.memo(Title);
