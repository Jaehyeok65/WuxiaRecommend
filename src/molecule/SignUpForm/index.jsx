import React, { useState } from 'react';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getSignUp } from '../../api/LoginAPI';

const SignUpForm = ({
    styled,
    userEmail,
    userPassword,
    onClose,
    userNickname,
}) => {
    const [input, setInput] = useState({
        userEmail: '',
        userPassword: '',
        userNickname: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const Init = () => {
        setInput({
            userEmail: '',
            userPassword: '',
            userNickname: '',
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (input.userEmail === '' || input.userPassword === '' || input.userNickname === '') {
            alert('아이디와 비밀번호 또는 닉네임을 입력해주세요');
            return;
        }
        const result = await getSignUp(input);
        if (result) {
            onClose();
        }
        Init();
    };

    if (!styled || !input) return <div>에러 발생</div>;

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <Input
                    type="email"
                    name={userEmail}
                    value={input.userEmail}
                    placeholder="이메일을 입력하세요..."
                    onChange={onChange}
                    styled={styled.input1}
                />
                <br />
                <Input
                    type="password"
                    name={userPassword}
                    value={input.userPassword}
                    placeholder="비밀번호를 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Input
                    type="text"
                    name={userNickname}
                    value={input.userNickname}
                    placeholder="닉네임을 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Button styled={styled.button}>회원가입</Button>
            </form>
        </React.Fragment>
    );
};

export default SignUpForm;
