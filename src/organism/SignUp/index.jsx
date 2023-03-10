import React from 'react';
import Button from '../../atoms/Button';
import Title from '../../atoms/Title';
import SignUpForm from '../../molecule/SignUpForm';

const Formstyle = {
    input1: {
        margin: '15% 0px 0px 18%',
        padding: '12px',
        width: '60%',
    },
    input2: {
        margin: '3% 0px 0px 18%',
        padding: '12px',
        width: '60%',
    },
    button: {
        margin: '3% 0px 0px 18%',
        padding: '12px',
        width: '66%',
        borderRadius: '4px',
        marginTop: '2%',
    },
};

const SignUp = ({ onClose, setLoginstate, setNickname }) => {

    return (
        <React.Fragment>
            <Title
                styled={{
                    textAlign: 'center',
                    fontSize: '25px',
                    marginTop: '5%',
                }}
            >
                SignUp
            </Title>
            <SignUpForm
                styled={Formstyle}
                username="userEmail"
                userpassword="userPassword"
                usernickname="userNickname"
                onClose={onClose}
                setLoginstate={setLoginstate}
                setNickname={setNickname}
            />
            <Button onClicks={onClose} styled={Formstyle.button}>
                닫기
            </Button>
        </React.Fragment>
    );
};

export default React.memo(SignUp);