import React from 'react';
import styled from 'styled-components';
import Footer from '../organism/Footer';
import { list } from '../organism/Sidebar';

const Body = styled.div`
    width: 80%;
    margin: 0 auto;
`;


const MainFrame = ({ children }) => {

    console.log(list);
    return (
        <React.Fragment>
            <Body>
                {children}
                </Body>
            <Footer />
        </React.Fragment>
    );
};

export default React.memo(MainFrame);
