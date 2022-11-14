import React, { useState } from 'react';
import WuxiaHead from '../../organism/WuxiaHead';
import Sidebar from '../../organism/Sidebar';


const Navigate = ( { loginstate, setLoginstate, setLoginToggle, setNickname}) => {


    const [sidetoggle, setSideToggle] = useState(false); //사이드바 관련 토글

    return(
        <React.Fragment>
            <WuxiaHead onClicks={() => setSideToggle(prev => !prev)} onClickss={() => setLoginToggle(prev => !prev)}
            loginstate={!loginstate} setLoginstate={() => setLoginstate(prev => !prev)} setNickname={() => setNickname(null)}/>
            <Sidebar onClicks={() => setSideToggle(prev => !prev)} toggle={sidetoggle} />
        </React.Fragment>
    )

};


export default React.memo(Navigate);




