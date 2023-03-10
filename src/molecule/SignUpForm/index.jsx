import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getSignUp } from '../../api/LoginAPI';

const SignupForms = styled.div``;

const SignUpForm = ({
    styled,
    username,
    userpassword,
    onClose,
    usernickname,
    setIsLogin,
    isLogin
}) => {

    const [signUpInput, setSignUpInput] = useState({
        userEmail: '',
        userPassword: '',
        userNickname: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (signUpInput.userEmail === '' || signUpInput.userPassword === '') {
            alert('아이디와 비밀번호를 입력해주세요');
            return;
        }
        const result = await getSignUp(signUpInput);
        if (result) {
            onClose();
        }
        SignUpinit();
        setIsLogin();
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setSignUpInput({
            ...signUpInput,
            [name]: value,
        });
    };

    const SignUpinit = () => {
        //상태 초기화
        console.log(isLogin);
        setSignUpInput({
            userEmail: '',
            userPassword: '',
            userNickname: '',
        });
    };


    if (!styled || !signUpInput) return <div>에러 발생</div>;

    return (
        <SignupForms>
            <form onSubmit={onSubmit}>
                <Input
                    type="email"
                    name={username}
                    value={signUpInput.userEmail}
                    placeholder="이메일을 입력하세요..."
                    onChange={onChange}
                    styled={styled.input1}
                />
                <br />
                <Input
                    type="password"
                    name={userpassword}
                    value={signUpInput.userPassword}
                    placeholder="비밀번호를 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Input
                    type="text"
                    name={usernickname}
                    value={signUpInput.userNickname}
                    placeholder="닉네임을 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Button styled={styled.button}>회원가입</Button>
            </form>
        </SignupForms>
    );
};

export default React.memo(SignUpForm);
