import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

const NavLists = styled.div`
     button {
        &:hover {
            background-color : black;
            color : white;
        };
    };
`



const NavList = ( { list = [], styled, onClicks }) => {


    return(
        <NavLists styled={styled}>
            {list.map((item, index) => (
                <Link to={item.path} key={index}><Button styled={styled.btn} onClicks={onClicks}>{item.name}</Button></Link>
            ))}
        </NavLists>
    )
}



export default React.memo(NavList);