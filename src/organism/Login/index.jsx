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

const Login= ( { onClose, isLogin, setIsLogin }) => {

    const [input, setInput] = useState({
        userEmail : '',
        userPassword : ''
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setInput({
            ...input,
            [name] : value
        })
    };

    const init = () => { //상태 초기화
        setInput({
            userEmail : '',
            userPassword : ''
        });
    };


    return(
        <Logins>
            <Title styled={{textAlign : 'center', fontSize : '25px', marginTop : '5%'}} onClicks={setIsLogin}>
                { isLogin ? 'Login' : 'Sign Up' }
            </Title>
            { isLogin ? 
                <LoginForm styled={LoginFormstyle} input={input} onChange={onChange} username="userEmail" userpassword="userPassword" init={init} onClose={onClose} /> :
                    <SignUpForm styled={LoginFormstyle} input={input} onChange={onChange} username="userEmail" userpassword="userPassword" init={init} onClose={onClose} />
            }
            <Button onClicks={onClose} styled={LoginFormstyle.button}>닫기</Button>
        </Logins>
    )

}



export default React.memo(Login);