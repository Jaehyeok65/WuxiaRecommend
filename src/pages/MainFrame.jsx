import React from 'react';
import styled from 'styled-components';
import Footer from '../organism/Footer';
import { list } from '../organism/Sidebar';
import Navlist from '../molecule/Navlist';

const Body = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const styleds= {
    btn : {
        width : '10%',
        padding : '12px',
        border : 'none'
    }
}

const MainFrame = ({ children }) => {

    console.log(list);
    return (
        <React.Fragment>
            <Body>
                <Navlist list={list} styled={styleds} onClick={console.log("하이")} nav={true} />
                {children}
                </Body>
            <Footer />
        </React.Fragment>
    );
};

export default React.memo(MainFrame);
