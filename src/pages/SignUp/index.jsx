import React from 'react';
import Title from '../../atoms/Title';
import SignUpForm from '../../molecule/SignUpForm';
import MainFrame from '../MainFrame';

const Formstyle = {
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
        margin: '2% 0px 8% 32%',
        padding: '12px',
        width: '37%',
        borderRadius: '4px',
        marginTop: '2%',
    },
    text: {
        margin: '10px 0px 0px 32%',
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
