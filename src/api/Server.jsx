import axios from "axios"
import Cookies from "react-cookie/cjs/Cookies";



const API = 'http://localhost:8088';


axios.defaults.withCredentials = true;


export const getLogin = async(logininfo, onClose) => {

    const data = await axios.post(`${API}/login`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    //console.log(document.cookie);
    window.alert(data.data);
    onClose();
    //cookie.set("sessionId",data.data);
};

export const getSignUp = async(logininfo, onClose) => {

    const data = await axios.post(`${API}/signup`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    //console.log(document.cookie);
    window.alert(data.data);
    onClose();
    //cookie.set("sessionId",data.data);
    
};