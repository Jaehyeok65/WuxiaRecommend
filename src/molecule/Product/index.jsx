import React from 'react';
import Title from '../../atoms/Title';
import { Text } from '../../atoms/Text';
import { FaHeart } from "react-icons/fa";
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import StarRate from '../StarRate';
import styled from 'styled-components';




const Product = ( { product, styled, icon, setIcon, setToggle, clicked, setClicked, init }) => {

    
    return(
        <>
        <img src={product.url} alt={product.title} />
        <div>
            <Title styled={styled.title}>{product.title}</Title>
            <Text styled={styled.text}>{product.subtitle}</Text>
            <Text styled={{...styled.text, fontSize : '13px', overflow : 'hidden'}}>{product.content}</Text>
            <Icon styled={{fontSize : '15px', color : 'red'}} icon={icon} setIcon={setIcon}><FaHeart /></Icon>
            <span style={{fontSize : '14px', verticalAlign : 'top', marginLeft : '8px'}}>{product.likes}</span>
            <Text styled={{...styled.text, marginTop : '5%'}}>조회수 : {product.view}</Text>
            <StarRate rate={product.rate} styled={{fontSize : '12px', color : '#FFCF36'}} clicked={clicked} init={init} />
            <Button onClicks={setToggle} styled={{width:'100px', marginBottom : '5%', borderRadius : '4px'}}>별점주기</Button><br/>
            <a href='/' style={{display : 'block', marginTop : '5%'}}>바로가기 링크</a>
        </div>
        </>
    )
}

export default React.memo(Product);