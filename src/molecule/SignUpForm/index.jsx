import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';


const SignupForms = styled.div`
   
`


const SignUpForm = ( { styled }) => {

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("회원가입");
    };

    return(
        <SignupForms>
            <form onSubmit ={onSubmit}>
                <Input type='email' placeholder='이메일을 입력하세요...' styled={styled.input1}/>
                <br/>
                <Input type='password' placeholder='비밀번호를 입력하세요...' styled={styled.input2} />
                <br/>
                <Button styled={styled.button}>회원가입</Button>
                </form>
        </SignupForms>
    )

}


export default React.memo(SignUpForm);