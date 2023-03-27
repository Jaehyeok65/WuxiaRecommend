import React from 'react';
import Title from '../../atoms/Title';
import LoginForm from '../../molecule/LoginForm';
import MainFrame from '../MainFrame';

const LoginFormstyle = {
    input1: {
        margin: '2% 0px 0px 0px',
        padding: '12px',
        width: '100%',
        maxwidth: '420px',
    },
    input2: {
        margin: '2% 0px 0px 0px',
        padding: '12px',
        width: '100%',
        maxwidth: '420px',
    },
    button: {
        margin: '2% 0px 10% 0px',
        padding: '12px',
        width: '100%',
        borderRadius: '4px',
        marginTop: '2%',
        maxwidth: '420px',
    },
    text: {
        margin: '10px 0px 0px 0px',
    },
};

const Login = ({ setLoginstate, setNickname }) => {
    return (
        <MainFrame>
            <Title
                styled={{
                    textAlign: 'center',
                    fontSize: '25px',
                    marginTop: '2%',
                }}
            >
                Login
            </Title>
            <LoginForm
                styled={LoginFormstyle}
                userName="userEmail"
                userPassword="userPassword"
                setLoginstate={setLoginstate}
                setNickname={setNickname}
            />
        </MainFrame>
    );
};

export default React.memo(Login);
