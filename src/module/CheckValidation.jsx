import { getNicknameCheck, getEmailCheck } from '../api/LoginAPI';

export const CheckPassword = (value) => {
    //value를 입력받아서

    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

    if (!passwordRegEx.test(value)) {
        return ['비밀번호 형식을 확인해주세요!', false];
    } else {
        return ['비밀번호 형식이 일치합니다!', true];
    }
};

export const CheckEmail = (value) => {
    //value를 입력받아서

    const emailRegEx =
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (!emailRegEx.test(value)) {
        return ['이메일 형식을 확인해주세요!', false];
    } else {
        return ['이메일 형식이 일치합니다!', true];
    }
};

export const CheckId = async (value) => {
    const data = await getEmailCheck(value);

    if (!data) {
        return ['이미 사용중인 아이디입니다!', false];
    } else {
        return ['사용 가능한 아이디입니다!', true];
    }
};

export const CheckNickname = async (value) => {
    const data = await getNicknameCheck(value);

    if (!data) {
        return ['이미 사용중인 닉네임입니다!', false];
    } else {
        return ['사용 가능한 닉네임입니다!', true];
    }
};

export const CheckRePassword = (password, checkpassword) => {
    if (password === checkpassword) {
        return ['비밀번호가 동일합니다!', true];
    } else {
        return ['비밀번호가 다릅니다!', false];
    }
};
