import React, { useEffect, useState } from 'react';
import MainFrame from '../MainFrame';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Product from '../../molecule/Product';



const Details = styled.div`
    display : grid;
    grid-template-columns: repeat(2,1fr);
    width : 50%;
    margin : 0 auto;
    margin-top : 3%;
    margin-bottom : 10%;

    > img {
        width : 100%;
        height : 100%;
        max-width : 280px;
    }

    @media screen and (max-width: 1000px) {
        width : 80%;
    }
`;


const Detail = ( { list }) => {

    const { title } = useParams();
    const [product, setProduct] = useState('');

    useEffect( () => {
        setProduct(() => list.filter(item => item.title === title)[0]);
    },[])

    return(
        <React.Fragment>
            <MainFrame>
                <Details>
                    <Product product={product} />
                </Details>
            </MainFrame>
        </React.Fragment>
    )

}


export default React.memo(Detail);