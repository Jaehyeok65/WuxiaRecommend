import React from 'react';
import Title from '../../atoms/Title';
import SignUpForm from '../../molecule/SignUpForm';
import MainFrame from '../MainFrame';

const Formstyle = {
    input1: {
        margin: '5% 0px 0px 0px',
        padding: '12px',
        width: '100%',
        maxwidth : '420px'
    },
    input2: {
        margin: '2% 0px 0px 0px',
        padding: '12px',
        width: '100%',
        maxwidth : '420px'
    },
    button: {
        margin: '2% 0px 8% 0px',
        padding: '12px',
        width: '100%',
        borderRadius: '4px',
        marginTop: '2%',
        maxwidth : '420px'
    },
    text: {
        margin: '10px 0px 0px 0px',
    },
};

const SignUp = () => {
    return (
        <MainFrame>
            <Title
                styled={{
                    textAlign: 'center',
                    fontSize: '25px',
                    marginTop: '2%',
                }}
            >
                Sign Up
            </Title>
            <SignUpForm
                styled={Formstyle}
                userEmail="userEmail"
                userPassword="userPassword"
                userNickname="userNickname"
                userPasswordCheck="userPasswordCheck"
            />
        </MainFrame>
    );
};

export default React.memo(SignUp);
