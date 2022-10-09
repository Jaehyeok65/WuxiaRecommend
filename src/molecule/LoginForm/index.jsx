import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';


const LoginForms = styled.div`
   
`


const LoginForm = ( { styled }) => {

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <LoginForms>
            <form onSubmit ={onSubmit}>
                <Input type='email' placeholder='이메일을 입력하세요...' styled={styled.input1}/>
                <br/>
                <Input type='password' placeholder='비밀번호를 입력하세요...' styled={styled.input2} />
                <br/>
                <Button styled={styled.button}>로그인</Button>
                </form>
        </LoginForms>
    )

}


export default React.memo(LoginForm);