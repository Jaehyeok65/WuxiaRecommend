import React, { useState } from 'react';
import Title from '../../atoms/Title';
import Icon from '../../atoms/Icon';
import { Text } from '../../atoms/Text';
import { FaHeart } from "react-icons/fa";
import StarRate from '../StarRate';



const CardInfo = ( { product, styled }) => {

    const [clicked, setClicked] = useState([false, false, false, false, false]);

    

    const init = () => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i <= product.rate ? true : false;
        }
         setClicked(clickStates);
    }

    return(
        <div>
            <Title styled={styled.title}>{product.title}</Title>
            <Text styled={styled.subtext}>{product.subtitle}</Text>
            <Icon styled={styled.icon} icon={true}><FaHeart /></Icon>
            <span style={styled.span}>{product.like}</span>
            <StarRate rate={product.rate} styled={{fontSize : '12px'}} clicked={clicked} init={init} />
            <Text styled={styled.text}>view:{product.view}</Text>
        </div>
    )

}


export default React.memo(CardInfo);