import React, { useState } from 'react';
import styled from 'styled-components';
import HeadText from '../molecule/HeadText';
import SearchInput from '../molecule/SearchInput';
import Button from '../atoms/Button';
import { getLogout } from '../api/LoginAPI';


const Head = styled.div`
    display : flex;
    justify-content : space-between;
    position : sticky;
    top : 0;
    z-index : 20000;
`;

const loginbtnstyle = {
    width : '80px',
    border : 'none',
    padding : '0px'
};

const SearchInputstyle = { //SearchInput의 스타일 지정
    input : {
        padding : '12px',
        margin : '4px 8px'
    },
    btn : {
        padding : '0px',
        margin : '0px',
        border : 'none',
        width : '80px',
        height : '100px'
    },
    div : {
        pcwidth : '50%',
        mobilewidth : '30%',
        textAlign : 'right',
    }
};

const HeadTextstyle = {
    text : {
        fontSize : '16px',
    },
    icon : {
        fontSize : '50px',
        margin : '4px 8px'
    },
    btn : {
        border : 'none',
        padding : '12px 20px',
    },
    head : {
        pcwidth : '60%',
        mobilewidth : '70%'
    }

};



const WuxiaHead = ( { onClicks, onClickss, loginstate, setLoginstate, setNickname }, ref) => {

    const [input, setInput] = useState("");

    

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onClear = () => {
        setInput("");
    };

    const onLogoutClick = () => {
        setLoginstate();
        setNickname();
    };



   

    return(
        <Head>
            <HeadText styled={HeadTextstyle} onClicks={onClicks} ref={ref} />
            <SearchInput styled={SearchInputstyle} values={input} name='search' onChange={onChange} onClear={onClear} />
            { loginstate ? 
                 <Button onClicks={onClickss} styled={loginbtnstyle}>로그인</Button> :
                        <Button onClicks={() => getLogout(onLogoutClick)} styled={loginbtnstyle}>로그아웃</Button> }
        </Head>
    )

}

const ForwardHead = React.forwardRef(WuxiaHead)

export default React.memo(ForwardHead);