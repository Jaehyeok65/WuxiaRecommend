import React, { useState } from 'react';
import Header from '../../organism/Header';
import Sidebar from '../../organism/Sidebar';

const Navigate = ({ loginstate, setLoginstate, setNickname }) => {
    const [sidetoggle, setSideToggle] = useState(false); //사이드바 관련 토글

    return (
        <React.Fragment>
            <Header
                onClick={() => setSideToggle((prev) => !prev)}
                loginstate={!loginstate}
                setLoginstate={() => setLoginstate((prev) => !prev)}
                setNickname={() => setNickname(null)}
                
            />
            <Sidebar
                onClick={() => setSideToggle((prev) => !prev)}
                toggle={sidetoggle}
            />
        </React.Fragment>
    );
};

export default React.memo(Navigate);
