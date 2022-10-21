import axios from "axios"



const API = 'http://localhost:8088';


axios.defaults.withCredentials = true;


export const getLogin = async(logininfo, onClose, setLoginstate) => {

    const data = await axios.post(`${API}/login`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    if(data.data) {
        setLoginstate();
    }
    onClose();
};

export const getSignUp = async(logininfo, onClose) => {

    const data = await axios.post(`${API}/signup`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    window.alert(data.data);
    onClose();
    
};

export const getLogout = async(setLoginstate) => {

    const data = await axios.get(`${API}/logout`);
    if(data.data) {
        setLoginstate();
    }
    else {
        window.alert("로그아웃 실패");
    }
};