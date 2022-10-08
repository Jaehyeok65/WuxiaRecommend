import React from 'react';
import styled from 'styled-components';


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




const Banner = ( { url, name }) => {

    

    return(
        <Banners>
            <img src={url} alt={name} />
        </Banners>
    )


}



export default React.memo(Banner);