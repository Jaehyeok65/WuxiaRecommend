

export const LOGIN = 'LOGIN';

export const SIGNUP = 'SIGNUP';

const initialState = {
    login : {
        data : false
    }, 
    signup : {
        data : false
    }
};

export const LoginModal = (data) => ({ type : LOGIN, data });

export const SignUpModal = (data) => ({ type : SIGNUP, data });




export default function modal(state = initialState, action) {
    switch (action.type) {
        case LOGIN : 
            return {
                ...state,
                login : {
                    data : action.data
                }
            }
        case SIGNUP : {
            return {
                ...state,
                signup : {
                    data : action.data
                }
            }
        }
        default : 
            return state;
    }
  };