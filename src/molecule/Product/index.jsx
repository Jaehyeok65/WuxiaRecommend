import React from 'react';
import Title from '../../atoms/Title';
import { Text } from '../../atoms/Text';


const Product = ( { product, styled }) => {


    return(
        <>
        <img src={product.url} alt={product.title} />
        <div>
            <Title styled={styled.title}>{product.title}</Title>
            <Text styled={{...styled.text, fontSize : '13px'}}>{product.content}</Text>
            <Text styled={styled.text}>조회수 : {product.view}</Text>
            <a href='/'>바로가기 링크</a>
        </div>
        </>
    )
}

export default React.memo(Product);