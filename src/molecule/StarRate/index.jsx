import React, { useEffect } from 'react';
import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { FaStar } from "react-icons/fa";


const Star = styled.div`
    text-align : ${props => props.styled ? props.styled.textAlign : 'left'};
`;

const StarRate = ( { styled, handleStar, clicked, init, rate }) => { //rate는 별점의 수

    

    const array = [0,1,2,3,4];

    useEffect( () => {
        if(init) {
            init();
        }
    },[]);

    
  

  
    //let score = clicked.filter(Boolean).length;

    return(
        <Star data-testid="star" styled={styled}>
            { array.map((item) => (
                <Icon styled={styled} icon={clicked[item]} 
                    key={item} setIcon={handleStar ? () => handleStar(item) : null}
                ><FaStar data-testid="stars"/></Icon>

            ))}
            { rate ? <span style={{fontSize : '14px'}}>&nbsp;{rate} / 5.0</span> : null }
        </Star>
    );



}


export default React.memo(StarRate);