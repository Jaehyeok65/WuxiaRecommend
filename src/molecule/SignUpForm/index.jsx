import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getSignUp } from '../../api/LoginAPI';


const SignupForms = styled.div`
   
`


const SignUpForm = ( { styled, input, onChange, username, userpassword, init, onClose, usernickname, setIsLogin }) => {

    

    const onSubmit = async(e) => {
        e.preventDefault();
        if(input.userEmail === '' || input.userPassword === '') {
            alert('아이디와 비밀번호를 입력해주세요');
            return;
        }
        const result = await getSignUp(input);
        if(result) {
            onClose();
        }
        init();
        setIsLogin();
    };

    if(!styled || !input) return <div>에러 발생</div>;

    return(
        <SignupForms>
            <form onSubmit ={onSubmit}>
                <Input type='email' name={username} value={input.userEmail} placeholder='이메일을 입력하세요...'
                    onChange={onChange} styled={styled.input1}/>
                <br/>
                <Input type='password' name={userpassword} value={input.userPassword} placeholder='비밀번호를 입력하세요...'
                    onChange={onChange} styled={styled.input2} />
                <br/>
                <Input type='text' name={usernickname} value={input.userNickname} placeholder='닉네임을 입력하세요...'
                    onChange={onChange} styled={styled.input2} />
                <br/>
                <Button styled={styled.button}>회원가입</Button>
                </form>
        </SignupForms>
    )

}


export default React.memo(SignUpForm);