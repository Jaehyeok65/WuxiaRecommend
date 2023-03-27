import React, { useState } from 'react';
import Header from '../../organism/Header';
import Sidebar from '../../organism/Sidebar';
import Navlist from '../../molecule/Navlist';

const list = [
    {
        name: '조회순',
        path: '/menu/조회순',
    },
    {
        name: '좋아요순',
        path: '/menu/좋아요순',
    },
    {
        name: '별점순',
        path: '/menu/별점순',
    },
    {
        name: '커뮤니티',
        path: '/community',
    },
    {
        name : '마이페이지',
        path : '/mypage'
    }
];

const styleds = {
    btn: {
        width: '10%',
        padding: '12px',
        border: 'none',
    },
};

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
            <Navlist list={list} styled={styleds} nav={true} />
            <Sidebar
                onClick={() => setSideToggle((prev) => !prev)}
                toggle={sidetoggle}
                list={list}
            />
        </React.Fragment>
    );
};

export default React.memo(Navigate);
