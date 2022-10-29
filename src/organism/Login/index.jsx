import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import Title from '../../atoms/Title';
import LoginForm from '../../molecule/LoginForm';
import SignUpForm from '../../molecule/SignUpForm';

const Logins = styled.div`

`
const LoginFormstyle = {
    input1 : {
        margin : '15% 0px 0px 18%',
        padding : '12px',
        width : '60%'
    },
    input2 : {
        margin : '3% 0px 0px 18%',
        padding : '12px',
        width : '60%'
    },
    button : {
        margin : '3% 0px 0px 18%',
        padding : '12px',
        width : '66%',
        borderRadius : '4px',
        marginTop : '2%'
    }
}

const Login= ( { onClose, isLogin, setIsLogin, setLoginstate, setNickname }) => {

    const [loginInput, setLoginInput] = useState({
        userEmail : '',
        userPassword : '',
    });

    const [signUpInput, setSignUpInput] = useState({
        userEmail : '',
        userPassword : '',
        userNickname : ''
    });

    const onLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginInput({
            ...loginInput,
            [name] : value
        })
    };

    const onSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpInput({
            ...signUpInput,
            [name] : value
        })
    };

    const Logininit = () => { //상태 초기화
        setLoginInput({
            userEmail : '',
            userPassword : '',
        });
    };

    const SignUpinit = () => { //상태 초기화
        setSignUpInput({
            userEmail : '',
            userPassword : '',
            userNickname : ''
        });
    };


    return(
        <Logins>
            <Title styled={{textAlign : 'center', fontSize : '25px', marginTop : '5%'}} onClicks={setIsLogin}>
                { isLogin ? 'Login' : 'Sign Up' }
            </Title>
            { isLogin ? 
                <LoginForm styled={LoginFormstyle} input={loginInput} onChange={onLoginChange} username="userEmail" userpassword="userPassword" init={Logininit} onClose={onClose} setLoginstate={setLoginstate} setNickname={setNickname} /> :
                    <SignUpForm styled={LoginFormstyle} input={signUpInput} onChange={onSignUpChange} username="userEmail" userpassword="userPassword" usernickname="userNickname" init={SignUpinit} onClose={onClose} setIsLogin={setIsLogin} />
            }
            <Button onClicks={onClose} styled={LoginFormstyle.button}>닫기</Button>
        </Logins>
    )

}



export default React.memo(Login);