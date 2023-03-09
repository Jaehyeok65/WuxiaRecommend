import axios from "axios"



export const API = 'http://localhost:8088';


axios.defaults.withCredentials = true;


export const getLogin = async(logininfo) => {

    const data = await axios.post(`${API}/login`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    if(data.data === "overlap") { //중복 로그인인지 확인
        const confirm = window.confirm("다른 PC에서 로그인 중입니다. 연결을 끊고 로그인 하시겠습니까?");
        if(confirm) {
            const nickname = await getOverlapLogin(logininfo);
            return nickname;
        }
        else {
        window.alert("취소하셨습니다.");
        }
    }
    else if(data.data === false) { //최초 로그인 성공
        window.alert("로그인 실패");
    }
    else {
        window.alert("로그인 성공");
        return data.data;
    }
};

export const getOverlapLogin = async(logininfo) => {
    const data = await axios.post(`${API}/overlap`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    window.alert("로그인 성공");
    if(data) {
        return data.data;
    }
}

export const getSessionCheck = async(setLoginstate, setNickname) => {
    const data = await axios.get(`${API}/sessioncheck`);
    if(data.data === true) { //세션이 만료되었으면
        setLoginstate(); //로그인 상태 변경
    }
    else {
        if(data.data !== false) {
        setNickname(data.data);
        }
    }
};

export const getSignUp = async(logininfo) => {

    const data = await axios.post(`${API}/signup`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword,
        userNickname : logininfo.userNickname
    });
    window.alert(data.data);
    if(data.data === "회원가입 완료") { //회원가입이 성공했을때만 닫기
        return true;
    }
    return false;
};

export const getLogout = async(setLoginstate) => {
    const confirm = window.confirm("로그아웃을 하시겠습니까?");
    if(!confirm) return;

    const data = await axios.get(`${API}/logout`);
    if(data.data) {
        setLoginstate();
    }
    else {
        window.alert("로그아웃 실패");
    }
};