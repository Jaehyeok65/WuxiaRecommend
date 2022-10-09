import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import Title from '../../atoms/Title';
import LoginForm from '../../molecule/LoginForm';

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
        borderRadius : '4px'
    }
}

const Login= ( { onClicks }) => {


    return(
        <Logins>
            <Title styled={{textAlign : 'center', fontSize : '25px', marginTop : '5%'}}>Login</Title>
            <LoginForm styled={LoginFormstyle}/>
            <Button onClicks={onClicks} styled={LoginFormstyle.button}>닫기</Button>
        </Logins>
    )

}



export default React.memo(Login);