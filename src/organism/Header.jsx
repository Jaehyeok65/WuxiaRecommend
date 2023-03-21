import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeadText from '../molecule/HeadText';
import SearchInput from '../molecule/SearchInput';
import Button from '../atoms/Button';
import { getLogout } from '../api/LoginAPI';
import useDebounce from '../hook/useDebounce';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyPageLogout } from '../redux/action';

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 20000;
    background-color: white;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const LoginHead = styled.div`
    display: flex;
    justify-content: space-between;
`;

const loginbtnstyle = {
    width: '80px',
    border: 'none',
    padding: '0px',
};

const SearchInputstyle = {
    //SearchInput의 스타일 지정
    input: {
        padding: '12px',
        margin: '4px 8px',
    },
    btn: {
        padding: '0px',
        margin: '0px',
        border: 'none',
        width: '80px',
        height: '100px',
    },
    div: {
        pcwidth: '50%',
        mobilewidth: '30%',
        textAlign: 'right',
    },
};

const HeadTextstyle = {
    text: {
        fontSize: '16px',
    },
    icon: {
        fontSize: '50px',
        margin: '4px 8px',
    },
    btn: {
        border: 'none',
        padding: '12px 20px',
    },
    head: {
        pcwidth: '70%',
        mobilewidth: '100%',
    },
};

const Header = (
    {
        onClick,
        onClickLoginModal,
        onClickSignUpModal,
        loginstate,
        setLoginstate,
        setNickname,
    },
    ref
) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const debounceVal = useDebounce(input);

    useEffect(() => {
        if (!debounceVal) return;
        if (debounceVal.trim() === '') return;
        navigate(`/search/검색결과/${debounceVal}`);
    }, [debounceVal]);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onClear = () => {
        setInput('');
    };

    const onLogoutClick = () => {
        setLoginstate();
        setNickname();
        dispatch(getMyPageLogout('좋아요'));
        dispatch(getMyPageLogout('별점'));
    };

    return (
        <Head>
            <HeadText styled={HeadTextstyle} onClick={onClick} ref={ref} />
            <SearchInput
                styled={SearchInputstyle}
                values={input}
                name="search"
                onChange={onChange}
                onClear={onClear}
            />
            <LoginHead>
                {loginstate ? (
                    <Button onClick={onClickLoginModal} styled={loginbtnstyle}>
                    <StyledLink to='/login'> 
                        로그인
                    </StyledLink>
                    </Button>
                ) : (
                    <Button
                        onClick={() => getLogout(onLogoutClick)}
                        styled={loginbtnstyle}
                    >
                        로그아웃
                    </Button>
                )}
                <Button onClick={onClickSignUpModal} styled={loginbtnstyle}>
                <StyledLink to='/signup'>
                    회원가입
                </StyledLink>
                </Button>
            </LoginHead>
        </Head>
    );
};

const ForwardHead = React.forwardRef(Header);

export default React.memo(ForwardHead);
