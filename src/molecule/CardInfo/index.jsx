import React from 'react';
import Title from '../../atoms/Title';
import Icon from '../../atoms/Icon';
import { Text } from '../../atoms/Text';
import { FaHeart } from "react-icons/fa";

const CardInfo = ( { product, styled }) => {

    return(
        <div>
            <Title styled={styled.title}>{product.title}</Title>
            <Text styled={styled.subtext}>{product.subtitle}</Text>
            <Icon styled={styled.icon} icon={true}><FaHeart /></Icon>
            <span style={styled.span}>{product.like}</span>
            <Text styled={styled.text}>view:{product.view}</Text>
        </div>
    )

}


export default React.memo(CardInfo);