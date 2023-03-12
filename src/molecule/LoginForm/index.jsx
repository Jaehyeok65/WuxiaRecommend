import React from 'react';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getLogin } from '../../api/LoginAPI';

const LoginForm = ({
    styled,
    input,
    onChange,
    username,
    userpassword,
    init,
    onClose,
    setLoginstate,
    setNickname,
}) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        if (input.userEmail === '' || input.userPassword === '') {
            alert('아이디와 비밀번호를 입력해주세요');
            return;
        }
        const nickname = await getLogin(input);
        if (nickname) {
            // 로그인 성공했을 경우
            setNickname(nickname);
            setLoginstate();
            onClose();
        }
        init();
    };

    if (!styled || !input) return <div>에러 발생</div>;

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <Input
                    type="email"
                    name={username}
                    value={input.userEmail}
                    placeholder="이메일을 입력하세요..."
                    onChange={onChange}
                    styled={styled.input1}
                />
                <br />
                <Input
                    type="password"
                    name={userpassword}
                    value={input.userPassword}
                    placeholder="비밀번호를 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Button styled={styled.button}>로그인</Button>
            </form>
        </React.Fragment>
    );
};

export default React.memo(LoginForm);
