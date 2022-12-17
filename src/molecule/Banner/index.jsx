import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const StyledLink = styled(Link)`
    text-decoration: none;
    color : inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Banners = styled.div`
    width : 100%;
    height : 100%;
    > img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        margin : 0 auto;
        cursor : pointer
      }
`;




const Banner = ( { product }) => {


    if(!product) return <div>에러 발생</div>;

    

    return(
        <StyledLink to={`/detail/${product.title}`}>
            <Banners>
                <img src={product.url} alt={product.title} />
            </Banners>
        </StyledLink>
    )


}



export default React.memo(Banner);