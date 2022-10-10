import React from 'react';
import styled from 'styled-components';
import Footer from '../organism/Footer';

const Body = styled.div`
    width : 80%;
    margin : 0 auto;
`

const MainFrame = ( { children }) => {

    return(
        <React.Fragment>
            <Body>
                { children }
            </Body>
            <Footer />
        </React.Fragment>
    )

}


export default React.memo(MainFrame);