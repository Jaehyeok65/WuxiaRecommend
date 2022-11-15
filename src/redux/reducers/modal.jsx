

export const LOGIN = 'LOGIN';

const initialState = {
    login : {
        data : false
    }, 
};

export const LoginModal = (data) => ({ type : LOGIN, data});




export default function modal(state = initialState, action) {
    switch (action.type) {
        case LOGIN : 
            return {
                ...state,
                login : {
                    data : action.data
                }
            }
        default : 
            return state;
    }
  };