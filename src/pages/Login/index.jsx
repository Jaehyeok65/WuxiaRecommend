import React from 'react';
import Title from '../../atoms/Title';
import LoginForm from '../../molecule/LoginForm';
import MainFrame from '../MainFrame';

const LoginFormstyle = {
    input1: {
        margin: '5% 0px 0px 32%',
        padding: '12px',
        width: '35%',
    },
    input2: {
        margin: '2% 0px 0px 32%',
        padding: '12px',
        width: '35%',
    },
    button: {
        margin: '2% 0px 10% 32%',
        padding: '12px',
        width: '37%',
        borderRadius: '4px',
        marginTop: '2%',
    },
    text: {
        margin: '10px 0px 0px 32%',
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
