import React from 'react';


const Product = ( { product }) => {


    return(
        <>
        <img src={product.url} alt={product.title} />
        <div>
            <h2>{product.title}</h2>
            <a href='/'>바로가기 링크</a>
        </div>
        </>
    )
}

export default React.memo(Product);