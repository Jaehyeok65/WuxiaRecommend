import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

const NavLists = styled.div`
    
`



const NavList = ( { list = [], styled }) => {


    return(
        <NavLists styled={styled}>
            {list.map((item, index) => (
                <Link to={item.path} key={index}><Button styled={styled.btn}>{item.name}</Button></Link>
            ))}
        </NavLists>
    )
}



export default React.memo(NavList);